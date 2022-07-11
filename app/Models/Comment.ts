import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  beforeFind,
  ModelQueryBuilderContract,
  beforeCreate
} from '@ioc:Adonis/Lucid/Orm'
import Post from 'App/Models/Post'
import User from 'App/Models/User'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public userId: number

  @column()
  public postId: number

  @column()
  public description: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Post)
  public post: BelongsTo<typeof Post>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeFind()
  public static fetchUser(query: ModelQueryBuilderContract<typeof Comment>) {
    query.preload('user')
  }

  @beforeFind()
  public static fetchPost(query: ModelQueryBuilderContract<typeof Comment>) {
    query.preload('post')
  }

  // @beforeCreate()
  // public static fetchPostBeforeCommentCreated(query: ModelQueryBuilderContract<typeof Comment>) {
  //   query.preload('post')
  // }
}
