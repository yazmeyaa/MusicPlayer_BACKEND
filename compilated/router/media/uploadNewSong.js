"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadNewSong = void 0;
const SingleSong_1 = require("../../models/SingleSong");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function uploadNewSong(req, res) {
    const { file } = req;
    const { username, name, author, duration, lycics } = req.body;
    if (!file) {
        return res.status(403).send({ error: 'file is required' });
    }
    if (!username) {
        return res.status(403).send({ error: 'cant publush file as anonimous' });
    }
    const allowedExt = RegExp(/^.*\.(mp3|ogg)$/);
    const isFileExtensionAllowed = allowedExt.test(file.originalname);
    if (!isFileExtensionAllowed) {
        return res.status(403).send({ error: 'wrong file extension' });
    }
    const pathToSong = path_1.default.join('../../files/music');
    fs_1.default.writeFile(pathToSong, file.path, (error) => {
        if (error) {
            throw error;
        }
    });
    const modelToSave = new SingleSong_1.SingleSong({
        name: name,
        path: pathToSong,
        originalFileName: file.originalname,
        duration: duration,
        lycics: lycics ? lycics : '',
        author: author
    });
    modelToSave.save();
    return res.status(200).send({ message: 'ok' });
}
exports.uploadNewSong = uploadNewSong;
