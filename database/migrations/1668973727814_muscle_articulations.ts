import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'muscle_articulation'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()

      /**
       * Relations
       */
      table
        .integer('muscle_id')
        .unsigned()
        .references('muscles.id')
        .onDelete('CASCADE')
        .notNullable()

      table
        .integer('articulation_id')
        .unsigned()
        .notNullable()
        .references('articulations.id')
        .onDelete('CASCADE')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
