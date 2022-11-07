import { DateTime } from 'luxon'
import { BaseModel, column, beforeSave, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Personal from './Personal'
import Aluno from './Aluno'
import Hash from '@ioc:Adonis/Core/Hash'

export default class User extends BaseModel {
  
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public nickname: string

  @column()
  public email: string

  @column()
  public cellphone: string

  @column()
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Aluno, {
    foreignKey: 'user_id'
  })
  public alunoProfile: HasOne<typeof Aluno>

  @hasOne(() => Personal, {
    foreignKey: 'user_id'
  })
  public personalProfile: HasOne<typeof Personal>

  @beforeSave()
  public static async hashPassword(user: User): Promise<void>
  {
    if(user.$dirty.password){
      user.password = await Hash.make(user.password)
    }
  }

  print = () => console.log(this.toObject())

}
