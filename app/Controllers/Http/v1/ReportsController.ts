import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class ReportsController {

  async posts({}: HttpContextContract) {
    let posts = await Post
                          .query()
                          .select('title')
                          .withCount('comment', (query) => {
                            query.as('total_comments')
                          }).orderBy('total_comments', 'desc');

    return {data: posts}
  }
}
