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
exports.getSongList = void 0;
const SingleSong_1 = require("../../models/SingleSong");
function getSongList(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const allSongs = yield SingleSong_1.SingleSong.find({});
        const response = allSongs.map((item) => {
            const newObject = {
                _id: item._id,
                name: item.name,
                author: item.author,
                lyrics: item.lyrics,
                duration: item.duration
            };
            return newObject;
        });
        res.status(200).send(response);
    });
}
exports.getSongList = getSongList;
