import Aluno from 'App/Models/Aluno'
import Factory from '@ioc:Adonis/Lucid/Factory'
import UserFactory from './UserFactory'
import Personal from 'App/Models/Personal'
import PersonalFactory from './PersonalFactory'

export default Factory.define(Aluno, async ({ faker }) => {
  const personais = await Personal.all();
  const rand = faker.datatype.number({min:1,max:personais.length});
  const randomPersonal = personais.find( personal => personal.id == rand )
  return {
    personal_id: randomPersonal && randomPersonal.id ? randomPersonal.id :  rand
  }
})
.relation('user', () => UserFactory)
.relation('personal', () => PersonalFactory)
.build()
