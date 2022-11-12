import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AlunoController 
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
    public async registerAlunoProfile({ auth, view }: HttpContextContract): Promise<any>
    {
        const user = auth.use('web').user!
        return view.render('aluno/register', {user})
    }

    /**
     * Cria uma cona de aluno para o usuario logado
     * @param HttpContextContract 
     */
     public async register({ auth, response }: HttpContextContract): Promise<any>
     {
         try {
             const user = auth.use('web').user!
             await user.load( loader => {
                 loader.load('alunoProfile')
             })
             
             if(!user.alunoProfile) await user.related('alunoProfile').create({});

             return response.status(201)
                             .redirect()
                             .toRoute('AlunoController.index', {user})
         } catch (error) {
             console.log(error)
             return response.status(301)
                             .redirect()
                             .back()
         }
         
     }
}
