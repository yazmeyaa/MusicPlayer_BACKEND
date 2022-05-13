import { Request, Response } from 'express'
import { User } from '../../models/User'
import JWT from 'jsonwebtoken'
import config from 'config'

type requestBody = {
    username: string,
    password: string
}

export async function authUser(req: Request<{}, {}, requestBody>, res: Response) {
    
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(403).send({ error: 'username and password is required' })
    }

    const isUserExist = await User.findOne({ username: username })

    if (!isUserExist) {
        return res.status(403).send({ error: 'wrong username or password' })
    }

    if (password !== isUserExist.password) {
        return res.status(403).send({ error: 'wrong username or password' })
    }

    const userToken = JWT.sign({ messageToHacker: 'why do you look this string?' }, config.get('JWTsecret'), { expiresIn: '1d' })
    return res.status(200).send({
        message: 'successfully authorised',
        JWT: userToken
    })

}