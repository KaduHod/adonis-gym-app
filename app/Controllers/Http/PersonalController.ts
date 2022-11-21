import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Aluno from 'App/Models/Aluno'
import Personal from 'App/Models/Personal'

export default class PersonalController 
{
    public async index({ auth ,view , session}: HttpContextContract): Promise<string>
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

    public async alunos({ auth, response, session, view }: HttpContextContract): Promise<any>
    {
        try{
            const user = auth.use('web').user!
            await user.load( loader => {
                loader.load('personalProfile')
            })
            const personal = user.personalProfile;
            await Personal.loadAlunos(personal)
            
            // return response.send(user)
            return view.render('personal/alunos', {user});
        }catch(error){
            console.log(error)
            return response.status(301)
                            .redirect()
                            .back()
        }
    }

    public async aluno({ auth, request, response, session, view}:HttpContextContract): Promise<string | void>
    {
        try {
            const user = auth.use('web').user!
            const {id} = request.params();
            const aluno = await Aluno
                                    .query()
                                    .where({id})
                                    .first();
            await aluno?.load('user');

            return view.render('personal/aluno', {aluno, user})
        } catch (error) {
            console.log(error)
            return response.status(301)
                            .redirect()
                            .back()
        }
    }

    public async createAlunoView({ auth, view, response }:HttpContextContract):Promise<string | void>
    {
        try {
            const user = auth.use('web').user!
            await user.load('personalProfile');
            return view.render('personal/criar-aluno', {user});
        } catch (error) {
            console.log(error)
            return response.status(301)
                            .redirect()
                            .back()
        }
        
    }
    
}
