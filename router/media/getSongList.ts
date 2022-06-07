import { Request, Response } from 'express'
import { SingleSong } from '../../models/SingleSong'



export async function getSongList(req: Request, res: Response) {

    interface dataFromDB {
        _id: string,
        name: string,
        author: string,
        lyrics: string,
        duration: number
        path: string,
        originalFileName: string,
    }

    const allSongs: Array<dataFromDB> = await SingleSong.find({})

    const response = allSongs.map((item) => {
        const newObject = {
            _id: item._id,
            name: item.name,
            author: item.author,
            lyrics: item.lyrics,
            duration: item.duration
        }
        return newObject

    })



    res.status(200).send(response)
}