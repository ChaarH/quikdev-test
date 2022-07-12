import { schema, validator, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreatePostReactionValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = validator.reporters.api

  public schema = schema.create({
    post_id: schema.number([
      rules.required(),
      rules.exists({table: 'posts', column: 'id'})
    ]),
    liked: schema.boolean([
      rules.required()
    ])
  })

  public messages: CustomMessages = {
    required: 'O campo {{ field }} é obrigatório',
    exist: 'O post informado não existe',
  }
}
