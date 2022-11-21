import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {readFile, writeFile} from 'fs/promises'
import Muscle from 'App/Models/Muscle'
import Articulation from 'App/Models/Articulation'
import Movement from 'App/Models/Movement'


export default class MusclesController {
    public async articulations({response}:HttpContextContract): Promise<any>
    {
        const articulations = JSON.parse(await readFile('./articulations-final.json'))
        // const articulacoesDb = await Articulation.all()
        
        

        
        // const articulacao = await Articulation.findBy('name','Scapula & Clavicle')
        return response
                        .status(200)
                        .send({articulacoesDb, articulations})
    }
}
