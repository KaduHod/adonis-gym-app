import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, belongsTo, BelongsTo, hasMany, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Articulation from './Articulation'
import Muscle from './Muscle'

export default class Movement extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @manyToMany(() => Articulation)
  public articulations: ManyToMany<typeof Articulation>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
