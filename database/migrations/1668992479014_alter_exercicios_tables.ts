import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'exercicios'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('name').notNullable()
      table.string('execution').notNullable()
      table.string('mechanic')
      table.string('force')
      table.string('link')
    })
  }
}
