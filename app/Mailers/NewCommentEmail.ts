import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
import User from 'App/Models/User';

export default class NewCommentEmail extends BaseMailer {

  constructor (private user: User) {
    super();
  }

  public prepare(message: MessageContract) {
    message
      .subject('Um novo comentário em seu post!')
      .from('carlos.aires@quikdev.com.br')
      .to(this.user.email)
      .htmlView('emails/new-comment', { user: this.user })
  }
}
