import { schema, rules, validator, CustomMessages } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class CreatePostValidator {
  constructor(protected ctx: HttpContextContract) {}

  public reporter = validator.reporters.api

  public schema = schema.create({
    title: schema.string([
      rules.maxLength(100),
      rules.required()
    ]),
    description: schema.string([
      rules.required()
    ]),
    image: schema.file.optional({
      size: '2mb',
      extnames: ['jpg', 'jpeg', 'png'],
    }),
  })

  public messages: CustomMessages = {
    required: 'O campo {{ field }} é obrigatório',
    maxLength: 'O campo {{ field }} deve conter no máximo {{ options.maxLength }} caracteres',
    'file.size': 'O tamanho do arquivo não pode exceder {{ options.size }}',
    'file.extname': 'Somente as extensões ({{ options.extnames }}) são permitidas'
  }
}
