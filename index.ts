import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import { registerNewUser } from './router/api/register'
import { authUser } from './router/api/auth'
import { uploadNewSong } from './router/media/uploadNewSong'
import multer from 'multer'
const upload = multer({ dest: 'uploads/' })

const app = express()

export const PROJECT_DIRECTION = __dirname

app.use(express.json())

async function startServer() {
    try {
        app.listen(config.get('PORT'), () => console.log(`Server started at port ${config.get('PORT')}`))

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

app.post('/api/register', registerNewUser)
app.post('/api/auth', authUser)
app.post('/meida/uploadNewSong', upload.single('song'), uploadNewSong)

startServer()