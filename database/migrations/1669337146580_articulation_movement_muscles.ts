import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'articulation_movement_muscle'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Relations
       */
       table
        .integer('articulation_muscle_id')
        .unsigned()
        .references('articulation_muscle.id')
        .onDelete('CASCADE')
        .notNullable()

      table
        .integer('movement_id')
        .unsigned()
        .references('movements.id')
        .onDelete('CASCADE')
        .notNullable()

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
