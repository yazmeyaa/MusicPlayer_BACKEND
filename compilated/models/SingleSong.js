"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SingleSong = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
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
});
exports.SingleSong = (0, mongoose_1.model)('SingleSong', schema);
