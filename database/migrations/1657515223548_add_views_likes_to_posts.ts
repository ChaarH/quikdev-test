import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('views').defaultTo(0).after('description');
      table.integer('likes').defaultTo(0).after('views');
      table.integer('unlikes').defaultTo(0).after('likes');
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('views');
      table.dropColumn('likes');
      table.dropColumn('unlikes');
    })
  }
}
