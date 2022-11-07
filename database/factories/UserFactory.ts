import User from 'App/Models/User'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(User, ({ faker }) => {
  return {
    name: faker.name.fullName(),
    nickname: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(20),
    cellphone : faker.phone.number('(41) 9####-####')
  }
})
.build()
