"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
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
});
exports.User = (0, mongoose_1.model)('Users', schema);
