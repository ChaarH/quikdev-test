import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('views').defaultTo(0).after('description');
      table.string('image').nullable().after('views');

    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('views');
      table.dropColumn('image');
    })
  }
}
