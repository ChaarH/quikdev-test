import Comment from 'App/Models/Comment'
import Factory from '@ioc:Adonis/Lucid/Factory'
import UserFactory from './UserFactory'
import PostFactory from './PostFactory'

export default Factory.define(Comment, ({ faker }) => {
  return {
    description: faker.lorem.paragraphs(5)
  }
})
.relation('user', () => UserFactory)
.relation('post', () => PostFactory)
.build()
