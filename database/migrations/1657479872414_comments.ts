import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'comments'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id')
        .notNullable()
        .unsigned()
        .references('users.id')
        .onDelete('CASCADE')
      table.integer('post_id')
        .notNullable()
        .unsigned()
        .references('posts.id')
        .onDelete('CASCADE')

      table.text('description').notNullable()

      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
