import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Movement from './Movement'
import Muscle from './Muscle'

export default class Articulation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Movement)
  public movements: ManyToMany<typeof Movement>

  @manyToMany(() => Muscle)
  public muscles: ManyToMany<typeof Muscle>
}
