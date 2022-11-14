import { DateTime } from 'luxon'
import { 
  BaseModel, 
  column, 
  belongsTo, 
  BelongsTo, 
  HasMany, 
  hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Aluno from './Aluno'

export default class Personal extends BaseModel {

  public static table = 'personais'

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

  @hasMany(() => Aluno, {
    foreignKey : 'personal_id'
  })
  public alunos: HasMany<typeof Aluno>

 
  public static async loadAlunos(personal:Personal):Promise<void>
  {
    await personal.load(loader => {
      loader.load('alunos')
    })
    for await (const aluno of personal.alunos){
        await aluno.load('user')
    }
  }
}
