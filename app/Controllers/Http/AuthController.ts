import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';
import UserRegisterValidator from 'App/Validators/UserRegisterValidator';

export default class AuthController 
{
    public async loginView({ view }:HttpContextContract): Promise<string>
    {
        return view.render('login');
    }

    public async registerView({ view }:HttpContextContract): Promise<string>
    {
        return view.render('register')
    }

    /**
     * @param HttpContract
     * @returns redirects user to next page
     */
    public async login({ auth, request, response }:HttpContextContract): Promise<void>
    {
        const email = request.input('email')
        const password = request.input('password')

        try {
          await auth.use('web').attempt(email, password)
          response.redirect('/choose-profile')
        } catch {
          return response.redirect().back()
        }
    }

    /**
     * Registra um usuario
     * @param HttpContext
     * @returns JSON response
     */
    public async register({request, response}: HttpContextContract): Promise<void>
    {
        try {
            const {name, nickname, email, password, cellphone} = await request.validate(UserRegisterValidator)
            
            const user = new User()
            user.name = name
            user.nickname = nickname
            user.email = email
            user.password = password
            user.cellphone = cellphone
            await user.save()

            return response.status(201).send({
                redirect : '/login'
            })
                            
        } catch (error) {
            if(error.messages){
                return response.status(400)
                                .send({ errors: error.messages })
            }
            return response.status(500)
                            .send({error:JSON.stringify(error)})
        }
    }

    public async chooseProfile({ auth, view } : HttpContextContract): Promise<string | void>
    {
        const user = auth.use('web').user!
        if(!user) return;
        await user.load( loader => {
            loader.load('alunoProfile')
            loader.load('personalProfile')
        })
        return view.render('choose_profile', {
            user
        })
    }
}
