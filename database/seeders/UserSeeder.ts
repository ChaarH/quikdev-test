import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'
import UserFactory from 'Database/factories/UserFactory'

export default class extends BaseSeeder {
  public async run () {

    await User.create({
      name: 'User test',
      email: 'user.test@gmail.com',
      password: '123456',
    })

    await UserFactory.with('post', 3).createMany(9)
  }
}
