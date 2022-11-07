import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import AlunoFactory from 'Database/factories/AlunoFactory'

export default class extends BaseSeeder {
  public async run () {
    await AlunoFactory
            .with('user', 1)
            .createMany(300);
  }
}
