import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {readFile, writeFile} from 'fs/promises'
import Articulation from 'App/Models/Articulation';
import Movement from 'App/Models/Movement'
import Muscle from 'App/Models/Muscle';


export default class MusclesController {
    public async articulations({response}:HttpContextContract): Promise<any>
    {
       
        const getMuslceIdByName = async nameMd => {
            console.log(nameMd)
            const {id, name} = await Muscle.findBy('name', nameMd)
            console.log({id, name})
            return id
        }

        const getArticulationByName = async name => {
            return await Articulation.findBy('name', name)
        }

        const getMoventByName = async name => await Movement.findBy('name', name)

        let articulations = JSON.parse(await readFile('./articulations-final.json'))
        let articulationNames = Object.keys(articulations);
        let result = [];
        for await (const name of articulationNames)
        {
            console.log({ARTICULATION:name})
            const articulacao = await getArticulationByName(name)
            const movements = []
            for await (const {movment, musclesFromMovement} of articulations[name])
            {
                const muscles = []
                for await (const {name} of musclesFromMovement)
                {
                    console.log(name)
                    muscles.push(await getMuslceIdByName(name))
                }
                movements.push({
                    movement: await getMoventByName(movment)
                })
            }

            result.push(articulacao)
        }
        // 
        const Articulations:Articulation[] = await Articulation.all();
        let promises = [];
        Articulation.forEach( art => promises.push(art.load('muscles')))
        // for await (const art of Articulations)
        // {
            // await art.load('muscles')
        // }    
        
        await Promise.all(promises)
        const articulacao = await Articulation.findBy('name','Scapula & Clavicle')
        return response
                        .status(200)
                        .send({articulations});
    }
}
