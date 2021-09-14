import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { BaseModel, beforeCreate, column, beforeSave } from '@ioc:Adonis/Lucid/Orm'
//Aqui usamos o comando: npm install uuid
//para que esse import funcione e ele vai ser usado para gerar o id unico unversal
import { v4 as uuidv4 } from 'uuid'

export default class User extends BaseModel {
  public static selfAssignPrimaryKey = true //essa flag indica que nao dependemos do banco de dados para gerar a chave primaria

  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column({ isPrimary: true })
  public secureId: string

  @column()
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  //Aqui usamos um hoook, de modo que antes de criar o usuario, ou persirtir ele no banco de dados sera chamado esse metodo o qual
  //vai criar o id unico para ser armazena no banco de dados
  @beforeCreate()
  public static assignUuid(user: User) {
    user.secureId = uuidv4() //aqui cria o id unico
  }
  //Aqui colocamos um beforeSave usado para ser chamdo antes de salvar o usuario
  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password) //Aqui criptografa a senha
    }
  }
}
