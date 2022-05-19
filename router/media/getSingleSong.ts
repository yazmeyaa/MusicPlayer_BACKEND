import { request, Request, Response } from 'express'
import { SingleSong } from '../../models/SingleSong'



export async function getSingleSong(req: Request<{ songID: string }>, res: Response) {
    const { songID } = req.query

    if (!songID) {
        return res.status(403).send({ error: 'songID is required' })
    }

    const songFromDB = await SingleSong.findOne({ __id: songID })
    
    if (!songFromDB) {
        return res.status(200).send({ message: 'song is not found' })
    }

    return res.status(200).send(songFromDB)

}