import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  beforeFind,
  ModelQueryBuilderContract,
  hasMany,
  HasMany,
  beforeFetch
} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Comment from './Comment'

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public views: number

  @column()
  public likes: number

  @column()
  public unlikes: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => Comment, {foreignKey: 'postId'})
  public comment: HasMany<typeof Comment>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeFind()
  public static fetchUser(query: ModelQueryBuilderContract<typeof Post>) {
    query.preload('user')
  }

  @beforeFind()
  public static fetchComment(query: ModelQueryBuilderContract<typeof Post>) {
    query.preload('comment')
  }
}
