import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'
import PostFactory from './PostFactory'
import CommentFactory from './CommentFactory'

export default Factory.define(User, ({ faker }) => {
  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password()
  }
})
.relation('post', () => PostFactory)
.relation('comment', () => CommentFactory)
.build()
