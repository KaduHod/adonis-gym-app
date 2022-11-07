import { DateTime } from 'luxon'
import { 
  BaseModel, 
  BelongsTo, 
  belongsTo, 
  column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Personal from './Personal'

export default class Aluno extends BaseModel {

  public static table = 'alunos'

  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public user_id: number

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>

  @column()
  public personal_id: number

  @belongsTo(() => Personal, {
    foreignKey: 'personal_id'
  })
  public personal: BelongsTo<typeof Personal>
}
