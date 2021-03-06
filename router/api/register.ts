import { Request, Response } from 'express'
import { User } from '../../models/User'

interface requestBody {
    username: string,
    password: string,
}

export async function registerNewUser(req: Request<{}, {}, requestBody>, res: Response) {
    const { username, password } = req.body

    if (!username || !password) {
        res.status(403).send({ error: 'required username and password' })
    }

    const isUserExist = await User.findOne({ username: username })

    if (!!isUserExist) {
        return res.status(403).send({ error: 'this username is already taken' })
    }

    const newUser = new User({
        username: username,
        password: password
    })

    await newUser.save()

    return res.status(201).send({ message: 'User successfully created' })

}