import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import PersonalFactory from 'Database/factories/PersonalFactory'

export default class extends BaseSeeder {
  public async run () {
    await PersonalFactory
            .with('user',1)
            .createMany(100);
  }
}
