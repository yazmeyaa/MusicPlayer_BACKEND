import { Schema, model } from 'mongoose'

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true  
    },
    originalFileName: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    lycics: {
        type: String,
        required: false
    },
    path: {
        type: String,
        required: true
    }
})

export const SingleSong = model('SingleSong', schema)