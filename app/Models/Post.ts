import { DateTime } from 'luxon'
import {
  BaseModel,
  column,
  belongsTo,
  BelongsTo,
  beforeFind,
  ModelQueryBuilderContract,
  hasMany,
  HasMany
} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Comment from 'App/Models/Comment'
import PostReaction from 'App/Models/PostReaction'
import Drive from '@ioc:Adonis/Core/Drive'

export default class Post extends BaseModel {
  public serializeExtras() {
    return {
        total_comments: this.$extras.total_comments,
        total_likes: this.$extras.total_likes,
        total_unlikes: this.$extras.total_unlikes
    }
  }

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

  @column()
  public image: string

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => Comment, {foreignKey: 'postId'})
  public comment: HasMany<typeof Comment>

  @hasMany(() => PostReaction, {foreignKey: 'postId'})
  public reaction: HasMany<typeof PostReaction>

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

  @beforeFind()
  public static fetchPostReaction(query: ModelQueryBuilderContract<typeof Post>) {
    query.preload('reaction')
  }
}
