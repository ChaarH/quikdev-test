import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AuthController {
  public async login({request, auth}: HttpContextContract) {
    const {email, password}  = request.all();

    const token = await auth.attempt(email, password, {
      expiresIn: '2 days'
    })

    return token;
  }

  public async logout({auth}: HttpContextContract) {
    await auth.logout();
  }

  public async me({auth}: HttpContextContract) {
    return {isLoggedIn: auth.user}
  }
}
