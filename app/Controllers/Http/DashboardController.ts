import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class DashboardController 
{
    public async index({auth, view}:HttpContextContract): Promise<string | void>
    {
        const user = auth.use('web').user!       
        return view.render('dashboard', {user})
    }

    

    
}
