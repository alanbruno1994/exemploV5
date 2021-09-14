import Route from '@ioc:Adonis/Core/Route'

/**
 * Aqui signfiica que para a rota /user vai atender para o metodos de requisicao:
 * get pelo metodo index e pelo show
 * post  pelo metodo store
 *put/patch  pelo metodo update
 * delete pelo metodo destroy
 */
Route.group(() => {
  //o apiOnly serve para excluir os metodos edit e create que esta ligado quando voce usa mvc usando os arquivos .edge
  //aqui a rota /api/user
  Route.resource('user', 'UsersController')
    .apiOnly()
    .middleware({
      //Aqui definimos que metodos podem ter a rota protegida pela autencicacao
      update: ['auth'],
      destroy: ['auth'],
      index: ['auth'],
      show: ['auth'],
    })
}).prefix('api') //aqui indica que tudo que tiver nesse grupo estara dentro de uma rota que comeca por uma /api
