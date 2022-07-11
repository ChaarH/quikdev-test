import { schema, rules, validator, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreateUserValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = validator.reporters.api

  public schema = schema.create({
    name: schema.string([
      rules.maxLength(100),
      rules.required()
    ]),
    email: schema.string([
      rules.maxLength(191),
      rules.required(),
      rules.unique({table: 'users', column: 'email'})
    ]),
    password: schema.string([
      rules.required()
    ])
  })

  public messages: CustomMessages = {
    required: 'O campo {{ field }} é obrigatório',
    maxLength: 'O campo {{ field }} deve conter no máximo {{ options.maxLength }} caracteres',
    unique: 'E-mail já cadastrado'
  }
}
