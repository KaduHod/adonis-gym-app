import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class PersonalController 
{
    public async index({ auth , view }: HttpContextContract): Promise<string>
    {
        const user = auth.use('web').user!
        return view.render('personal/dashboard',{ user })
    }

    /**
     * @param HttpContextContract
     * @returns register personal view
     */
    public async registerPersonalProfile({ auth, view }: HttpContextContract): Promise<any>
    {
        const user = auth.use('web').user!
        return view.render('personal/register', { user })
    }

    /**
     * Cria uma cona de personal para o usuario logado
     * @param HttpContextContract 
     */
    public async register({ auth, response }: HttpContextContract): Promise<any>
    {
        try {
            const user = auth.use('web').user!
            await user.load( loader => {
                loader.load('personalProfile')
            })

            if(!user.personalProfile) await user.related('personalProfile').create({});
            
            return response.status(201)
                            .redirect()
                            .toRoute('PersonalController.index', { user })
        } catch (error) {
            console.log(error)
            return response.status(301)
                            .redirect()
                            .back()
        }
        
    }
}
