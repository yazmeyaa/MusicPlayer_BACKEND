import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import { registerNewUser } from './router/api/register'
import { authUser } from './router/api/auth'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

export const PROJECT_DIRECTION = __dirname

async function startServer() {
    try {
        app.listen(process.env.PORT || config.get('PORT'), () => console.log(`Server started at port ${config.get('PORT')}`))

        mongoose.connect(config.get('mongoDBsecret'), (error) => {
            if (error) {
                throw error
            } else {
                console.log('Connected to MongoDB')
            }
        })

    }
    catch (error) {
        throw error
    }
}
//

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.post('/api/register', registerNewUser)
app.post('/api/auth', authUser)

startServer()