import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  hasMany,
  HasMany,
  beforeFind,
  ModelQueryBuilderContract
} from '@ioc:Adonis/Lucid/Orm'
import Post from 'App/Models/Post'
import Comment from './Comment'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @hasMany(() => Post, {foreignKey: 'userId'})
  public post: HasMany<typeof Post>

  @hasMany(() => Comment, {foreignKey: 'userId'})
  public comment: HasMany<typeof Comment>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeFind()
  public static fetchPost(query: ModelQueryBuilderContract<typeof User>) {
    query.preload('post')
  }

  @beforeFind()
  public static fetchComment(query: ModelQueryBuilderContract<typeof User>) {
    query.preload('comment')
  }
}
