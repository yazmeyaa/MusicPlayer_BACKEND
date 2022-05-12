import { Schema, model } from 'mongoose'

const schema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    playlists: {
        type: Array,
        required: false
    },
    avatar: {
        type: String,
        required: false
    }
})

export const User = model('Users', schema)