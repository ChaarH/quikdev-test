import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class extends BaseSeeder {
  public async run () {
    await User.create({
      name: 'User test',
      email: 'user.test@gmail.com',
      password: '123456',
    })
  }
}
