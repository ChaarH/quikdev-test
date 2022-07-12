import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import PostReaction from 'App/Models/PostReaction';
import CreatePostReactionValidator from 'App/Validators/CreatePostReactionValidator'

export default class PostReactionsController {

  async store({request, auth}: HttpContextContract) {
    const {post_id, liked} = await request.validate(CreatePostReactionValidator);

    const userLogged = await auth.user!

    const postReaction = await PostReaction
      .query()
      .where('user_id', userLogged.id)
      .where('post_id', post_id)
      .first();

    const likedReaction = liked ? 'LIKED' : 'UNLIKED'

    if (!postReaction) {
      await this.save(userLogged.id, post_id, likedReaction)
      return {'message': `Você ${!liked ? 'não ' : ''}curtiu este post`}
    }

    postReaction.liked = likedReaction
    await postReaction.save()

    return {'message': `Você ${!liked ? 'não ' : ''}curtiu este post`}
  }

  async save(userId, postId, liked) {
    await PostReaction.create({userId, postId, liked});
  }

  async destroy({params, auth, response}: HttpContextContract) {
    const userLogged = await auth.user!
    const postReaction = await PostReaction
      .query()
      .where('user_id', userLogged.id)
      .where('post_id', params.id)
      .first();

    if (!postReaction) {
      return response
        .status(404)
        .json({'message': 'Post não encontrado'});
    }

    if (userLogged.id !== postReaction.userId) {
      return response
        .status(401)
        .json({'message': 'Você não tem permissão para realizar esta ação'});
    }

    await postReaction.delete();

    return response.noContent();
  }
}
