import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import { registerNewUser } from './router/api/register'
import { authUser } from './router/api/auth'
import { uploadNewSong } from './router/media/uploadNewSong'
import multer from 'multer'
import { getSongList } from './router/media/getSongList'
import cors from 'cors'
import { getSingleSong } from './router/media/getSingleSong'
import cookieParser from 'cookie-parser'

const upload = multer({ dest: 'uploads/' })

const app = express()

export const PROJECT_DIRECTION = __dirname

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

app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.post('/api/register', registerNewUser)
app.post('/api/auth', authUser)
app.post('/meida/uploadNewSong', upload.single('song'), uploadNewSong)
app.get('/media/getSongList', getSongList)
app.get('/media/getSingleSong', getSingleSong)

startServer()