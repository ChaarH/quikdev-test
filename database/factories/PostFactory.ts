import Post from 'App/Models/Post'
import Factory from '@ioc:Adonis/Lucid/Factory'
import CommentFactory from './CommentFactory'

export default Factory.define(Post, ({ faker }) => {
  return {
    title: faker.lorem.sentence(),
    description: faker.lorem.paragraphs(4),
    views: faker.random.numeric(),
    image: faker.image.abstract()
  }
})
.relation('comment', () => CommentFactory)
.build()
