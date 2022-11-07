import { schema, CustomMessages, rules  } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class UserRegisterValidator {
  constructor(protected ctx: HttpContextContract) {}

  /*
   * Define schema to validate the "shape", "type", "formatting" and "integrity" of data.
   *
   * For example:
   * 1. The username must be of data type string. But then also, it should
   *    not contain special characters or numbers.
   *    ```
   *     schema.string({}, [ rules.alpha() ])
   *    ```
   *
   * 2. The email must be of data type string, formatted as a valid
   *    email. But also, not used by any other user.
   *    ```
   *     schema.string({}, [
   *       rules.email(),
   *       rules.unique({ table: 'users', column: 'email' }),
   *     ])
   *    ```
   */
  public schema = schema.create({
    name: schema.string(),
    nickname: schema.string(),
    email: schema.string([
      rules.email(),
      rules.unique({ table: 'users', column: 'email'}),
    ]),
    cellphone: schema.string(),
    password: schema.string([
      rules.minLength(8),
    ])
  })

  /**
   * Custom messages for validation failures. You can make use of dot notation `(.)`
   * for targeting nested fields and array expressions `(*)` for targeting all
   * children of an array. For example:
   *
   * {
   *   'profile.username.required': 'Username is required',
   *   'scores.*.number': 'Define scores as valid numbers'
   * }
   *
   */
  public messages: CustomMessages = {
    'name.required' : 'Nome deve ser preenchido!',
    'nickname.required' : 'Nick name deve ser preenchido',
    'email.email' : 'Email inválido',
    'email.unique' : 'Email inválido',
    'email.required' : 'Email deve ser preenchido',
    'cellphone.required' : 'Celular deve ser preenchido',
    'password.required' : 'Senha deve ser preenchida',
    'password.minLength' : 'Senha inválida'
  }
}
