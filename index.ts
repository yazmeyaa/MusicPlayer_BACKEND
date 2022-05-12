import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import { registerNewUser } from './router/api/register'
const app = express()

export const PROJECT_DIRECTION = __dirname

app.use(express.json())

async function startServer() {
    try {
        app.listen(config.get('PORT'), () => console.log(`Server started at port ${config.get('PORT')}`))

        mongoose.connect(config.get('mongoDBsecret'), (error) => {
            if(error){
                console.log(error)
            }
            console.log('Connected to MongoDB')
        })

    }
    catch (error) {
        throw error
    }
}

app.post('/api/register', registerNewUser)

startServer()