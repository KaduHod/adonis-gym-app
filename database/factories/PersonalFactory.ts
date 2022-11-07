import Personal from 'App/Models/Personal'
import Factory from '@ioc:Adonis/Lucid/Factory'
import UserFactory from './UserFactory'

export default Factory.define(Personal, ({ faker }) => {
  return {
    
  }
})
.relation('user', () => UserFactory)
.build()
