import { Application } from '@adonisjs/core/build/standalone';
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Post from 'App/Models/Post'
import CreatePostValidator from 'App/Validators/CreatePostValidator';

export default class PostsController {

  async index({}: HttpContextContract) {
    const posts = await Post.all();

    return {data: posts};
  }

  async store({request, auth}: HttpContextContract) {
    const data = await request.validate(CreatePostValidator)
    const userLogged = await auth.user!

    const postImage = request.file('post_image')

    // if (postImage) {
    //   await postImage.move(Application.tmpPath('uploads'))
    // }

    const post = await Post.create({...data,userId: userLogged.id});

    return {data: post};
  }

  async show({params, response}: HttpContextContract) {
    const post = await Post.findOrFail(params.id);

    if (!post) {
      response.notFound();
    }

    this.incrementViews(params.id)

    return {data: post};
  }

  async update({params, request, response, auth}: HttpContextContract) {
    const data = request.only(['title', 'description', 'liked']);
    const post = await Post.findOrFail(params.id);

    if (!post) {
      return response.notFound();
    }

    const userLogged = await auth.user!

    if (userLogged.id !== post.userId) {
      return response.unauthorized();
    }

    if (!post) {
      response.notFound();
    }

    post.merge(data);

    this.updateLikedOrUnliked(params.id, data.liked)
    await post.save();

    return {data: post};
  }

  async destroy({params, response, auth}: HttpContextContract) {
    const post = await Post.findOrFail(params.id);
    const userLogged = await auth.user!

    if (!post) {
      return response.notFound();
    }

    if (userLogged.id !== post.userId) {
      return response.unauthorized();
    }

    await post.delete();
  }

  async report({}: HttpContextContract) {
    const posts = await Post.all();

    return {data: posts}
  }

  async incrementViews(id) {
    await Post
      .query()
      .where('id', id)
      .increment('views', 1);
  }

  async updateLikedOrUnliked(id, action) {
    console.log(`Post de id ${id} like: ${action}`)
    const column = action ? 'likes' : 'unlikes';

    await Post
      .query()
      .where('id', id)
      .increment(`${column}`, 1)
  }
}