"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleSong = void 0;
const SingleSong_1 = require("../../models/SingleSong");
function getSingleSong(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { songID } = req.query;
        if (!songID) {
            return res.status(403).send({ error: 'songID is required' });
        }
        const songFromDB = yield SingleSong_1.SingleSong.findOne({ __id: songID });
        if (!songFromDB) {
            return res.status(200).send({ message: 'song is not found' });
        }
        return res.status(200).send(songFromDB);
    });
}
exports.getSingleSong = getSingleSong;
