import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import CreatePostValidator from 'App/Validators/CreatePostValidator';

export default class PostsController {

  async index({request}: HttpContextContract) {
    const {page, per_page} = await request.only(['page','per_page']);
    const posts = await Post.query().paginate(page?? 1, per_page?? 2);
    return {data: posts};
  }

  async store({request, auth}: HttpContextContract) {
    const {title, description} = await request.validate(CreatePostValidator)
    const userLogged = await auth.user!

    let newNameFile;
    if (request.file('image')) {
      newNameFile = await this.uploadFile(request.file('image'));
    }

    const post = await Post.create({
      userId: userLogged.id,
      title,
      description,
      image: newNameFile
    });

    return {message: 'Post cadastrado', data: post};
  }

  async show({params, response}: HttpContextContract) {
    const post = await Post.query().where('id', params.id)
      .withCount('reaction', (query) => {
        query.where('liked', 'LIKED').as('total_likes')
      })
      .withCount('reaction', (query) => {
        query.where('liked', 'UNLIKED').as('total_unlikes')
      });

    if (!post) {
      return response
        .status(404)
        .json({'message': 'Post não encontrado'});
    }

    this.incrementViews(params.id);

    return {data: post};
  }

  async update({params, request, response, auth}: HttpContextContract) {
    const {title, description} = request.only(['title', 'description']);
    const post = await Post.find(params.id);

    if (!post) {
      return response
        .status(404)
        .json({'message': 'Post não encontrado'});
    }

    const userLogged = await auth.user!

    if (userLogged.id !== post.userId) {
      return response
        .status(401)
        .json({'message': 'Você não tem permissão para realizar esta ação'});
    }

    if (!post) {
      return response
        .status(404)
        .json({'message': 'Post não encontrado'});
    }

    post.merge({title, description});

    await post.save();

    return {message: 'Post atualizado', data: post};
  }

  async destroy({params, response, auth}: HttpContextContract) {
    const post = await Post.findOrFail(params.id);
    const userLogged = await auth.user!

    if (!post) {
      return response
        .status(404)
        .json({'message': 'Post não encontrado'});
    }

    if (userLogged.id !== post.userId) {
      return response
        .status(401)
        .json({'message': 'Você não tem permissão para realizar esta ação'});
    }

    await post.delete();

    return response.noContent();
  }

  async report({}: HttpContextContract) {
    const posts = await Post.all();

    return {data: posts}
  }

  async uploadFile(file) {
    const newName = new Date().getTime()+"."+file.extname;
    await file.move(Application.tmpPath('posts'), {name: newName});
    return newName;
  }

  async incrementViews(id) {
    await Post
      .query()
      .where('id', id)
      .increment('views', 1);
  }
}
