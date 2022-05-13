import { Request, Response } from 'express'
import fs from 'fs'
import { PROJECT_DIRECTION } from '../..'
import path from 'path'

type reqBodyData = {
    username: string,
    name: string,
    author?: string,
    lycics?: string,
    duration?: number,
}

export function uploadNewSong(req: Request<{}, {}, reqBodyData>, res: Response) {
    const { file } = req
    const { username, name, author, duration, lycics } = req.body
    if (!file) {
        return res.status(403).send({ error: 'file is required' })
    }

    if (!username) {
        return res.status(403).send({ error: 'cant publush file as anonimous' })
    }


    const allowedExt = RegExp(/^.*\.(mp3|ogg)$/)
    const isFileExtensionAllowed = allowedExt.test(file.originalname)

    if(!isFileExtensionAllowed){
        return res.status(403).send({error: 'wrong file extension'})
    }

    fs.writeFile(path.join(PROJECT_DIRECTION, 'files', 'music', file.originalname), file.path, (error)=>{
        if(error){
            throw error
        }
    })


    return res.status(200).send({ message: 'ok' })
}