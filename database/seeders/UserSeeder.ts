import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  //Essa flag indica que que os dados da seeder so serao usados para ambiente de desenvolvimento
  public static developmentOnly = true

  public async run() {
    //Aqui do jeito que foi feito se o dado ja existir entao apenas atualize,
    //nesse sentido, definimos que email vai ser um valor de chave unico, para que quando
    //cheagar um email que exista na basededados ele apenas atualiza e nao coloque um novo
    const uniqueKey = 'email'
    await User.updateOrCreateMany(uniqueKey, [
      {
        email: 'xxx@gmail.com',
        password: 'India',
      },
      {
        email: 'ui@gmail.com',
        password: 'France',
      },
      {
        email: 'sosvari21@gmail.com',
        password: ' Thailand',
      },
    ])
  }
}
