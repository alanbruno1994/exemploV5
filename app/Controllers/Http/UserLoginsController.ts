// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserLoginsController {
  /*
  Usamos auth para lidar com autenticacoes,
  resquest para lidar com as requisicoes
  response para enviar uma resposta
  
  */
  public async login({ auth, request, response }) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      /**
       * Aqui e onde fazemos a autenticacao e geramos o token, alem do mais passamos expiresIn para dizer em quanto tempo o token ira expirar,
       * nesse caso vai ser 3 dias, depois a proriedade name, para dizer la na tabela de tokens, que esta usando um token, em outras palavras
       * quem esta fazendo uso de autenticacao, lembrando que tabela de tokens tem os tokens enviandos ao cliente criptogrados a titulo de comparacao
       */
      const token = await auth
        .use('api')
        .attempt(email, password, { expiresIn: '3days', name: email })
      return token
    } catch {
      return response.badRequest('Invalid credentials')
    }
  }
}
