import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'post_reactions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
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

      table.enum('liked', ['LIKED', 'UNLIKED']);

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
