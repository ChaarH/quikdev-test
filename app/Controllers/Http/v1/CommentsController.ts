import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NewCommentEmail from 'App/Mailers/NewCommentEmail';
import Comment from 'App/Models/Comment';
import User from 'App/Models/User';
import CreateCommentValidator from 'App/Validators/CreateCommentValidator';

export default class CommentsController {

  async index({}: HttpContextContract) {
    const comment = await Comment.all();
    return {data: comment};
  }

  async store({request, auth}: HttpContextContract) {
    const data = await request.validate(CreateCommentValidator)
    const userLogged = await auth.user!

    const comment = await Comment.create({
      postId: data.post_id,
      ...data,
      userId: userLogged.id
    });

    await comment.load('post');

    const user = await User.find(comment.post.userId);
    await new NewCommentEmail(user!).send();

    return {message: 'Comentário cadastrado', data: comment};
  }

  async show({params, response}: HttpContextContract) {
    const comment = await Comment.find(params.id);

    if (!comment) {
      return response
        .status(404)
        .json({'message': 'Comentário não encontrado'});
    }

    return {data: comment};
  }

  async update({params, request, response, auth}: HttpContextContract) {
    const data = request.only(['description']);

    const comment = await Comment.find(params.id);

    if (!comment) {
      return response
        .status(404)
        .json({'message': 'Comentário não encontrado'});
    }

    const userLogged = await auth.user!

    if (userLogged.id !== comment.userId) {
      return response
        .status(401)
        .json({'message': 'Você não tem permissão para realizar esta ação'});
    }

    comment.merge(data);
    await comment.save();

    return {message: 'Comentário atualizado', data: comment};
  }

  async destroy({params, response, auth}: HttpContextContract) {
    const comment = await Comment.findOrFail(params.id);

    if (!comment) {
      return response
        .status(404)
        .json({'message': 'Comentário não encontrado'});
    }

    const userLogged = await auth.user!

    if (userLogged.id !== comment.userId || userLogged.id !== comment.post.userId) {
      return response
        .status(401)
        .json({'message': 'Você não tem permissão para realizar esta ação'});
    }

    await comment.delete();

    return response.noContent();
  }
}
