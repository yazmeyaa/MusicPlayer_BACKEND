import express, {Request, Response} from 'express'
import config from 'config'
const PORT = config.get('PORT')
const app = express()

app.listen(PORT)