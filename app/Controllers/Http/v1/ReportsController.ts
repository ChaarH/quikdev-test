import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'

export default class ReportsController {

  async posts({response}: HttpContextContract) {
    const posts = await Post
                          .query()
                          .select('title')
                          .withCount('comment', (query) => {
                            query.as('total_comments')
                          })
                          .withCount('reaction', (query) => {
                            query.where('liked', 'LIKED').as('total_likes')
                          })
                          .withCount('reaction', (query) => {
                            query.where('liked', 'UNLIKED').as('total_unlikes')
                          })
                          .orderBy('total_comments', 'desc');

    if (!posts) {
      return response
        .status(400)
        .json({'message': 'Erro ao processar relatório'});
    }

    return {data: posts}
  }
}
