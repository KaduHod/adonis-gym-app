import { DateTime } from 'luxon'
import { BaseModel, column , ManyToMany, manyToMany} from '@ioc:Adonis/Lucid/Orm'
import Movement from './Movement'
import Articulation from './Articulation'

export default class Muscle extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public image: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Articulation)
  public articulations: ManyToMany<typeof Articulation>
}
