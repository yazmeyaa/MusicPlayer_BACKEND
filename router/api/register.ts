import { Request, Response } from 'express'
import { User } from '../../models/User'
import { PROJECT_DIRECTION } from '../../index'
import fs from 'fs'
import path from 'path'

interface requestBody {
    username: string,
    password: string,
}

export async function registerNewUser(req: Request<{}, {}, requestBody>, res: Response) {
    const { username, password } = req.body

    if (typeof username == 'undefined' || typeof password == 'undefined') {
        res.status(403).send({ error: 'required username and password' })
    }

    const isUserExist = await User.findOne({ username: username })

    if (!!isUserExist) {
        return res.status(200).send({ error: 'this username is already taken' })
    }

    const newUser = new User({
        username: username,
        password: password
    })

    fs.mkdir(path.join(PROJECT_DIRECTION, 'files', username), (error) => {
        if (error) {
            throw error
        }
    })

    await newUser.save()

    return res.status(200).send({ message: 'User successfully created' })

}