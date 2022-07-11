import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id')
        .unsigned()
        .notNullable()
        .references('users.id')
        .onDelete('CASCADE')

      table.string('title', 100).notNullable()
      table.text('description').notNullable()

      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
