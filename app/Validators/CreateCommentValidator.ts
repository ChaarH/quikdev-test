import { schema, rules, validator, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateCommentValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = validator.reporters.api

  public schema = schema.create({
    description: schema.string([
      rules.required()
    ]),
    post_id: schema.number([
      rules.required()
    ])
  })

  public messages: CustomMessages = {
    required: 'O campo {{ field }} é obrigatório'
  }
}
