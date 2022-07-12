import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import CreateUserValidator from 'App/Validators/CreateUserValidator'

export default class UsersController {

  async index({}: HttpContextContract) {
    const users = await User.all()
    return {data: users}
  }

  async store({request}: HttpContextContract) {
    const data = await request.validate(CreateUserValidator)

    const user = await User.create(data);
    return {message: 'Usuário cadastrado', data: user};
  }

  async show({params, response}: HttpContextContract) {
    const user = await User.find(params.id);

    if (!user) {
      return response
        .status(404)
        .json({'message': 'Usuário não encontrado'});
    }

    return {data: user};
  }

  async update({params, request, response}: HttpContextContract) {
    const data = request.only(['name', 'email','password']);

    const user = await User.find(params.id);

    if (!user) {
      return response
        .status(404)
        .json({'message': 'Usuário não encontrado'});
    }

    user.merge(data);
    await user.save();

    return {message: 'Usuário atualizado', data: user};
  }

  async destroy({params, response}: HttpContextContract) {
    const user = await User.find(params.id);

    if (!user) {
      return response
        .status(404)
        .json({'message': 'Usuário não encontrado'});
    }

    await user.delete();

    return response.noContent();
  }
}
