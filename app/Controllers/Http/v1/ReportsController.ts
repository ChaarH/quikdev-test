import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class ReportsController {

  async posts({}: HttpContextContract) {
    const posts = await Post
                          .query()
                          .select(['id', 'title'])
                          .withCount('comment', (query) => {
                            query.as('total_comments')
                          });

    let response = posts.map(function(post) {
      return post.$extras.total_comments
    })

    return response
  }
}
