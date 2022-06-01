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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerNewUser = void 0;
const User_1 = require("../../models/User");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function registerNewUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        if (!username || !password) {
            res.status(403).send({ error: 'required username and password' });
        }
        const isUserExist = yield User_1.User.findOne({ username: username });
        if (!!isUserExist) {
            return res.status(403).send({ error: 'this username is already taken' });
        }
        const newUser = new User_1.User({
            username: username,
            password: password
        });
        const userJsonFile = {
            username: username,
            favoriteSongs: [],
            playlists: [],
            friends: []
        };
        const userFolder = path_1.default.join(__dirname, '../../files', username);
        fs_1.default.mkdir(userFolder, (error) => {
            if (error) {
                console.log(error);
            }
        });
        fs_1.default.writeFile(`${userFolder}/${username}.json`, JSON.stringify(userJsonFile), (error) => {
            if (error) {
                throw error;
            }
        });
        yield newUser.save();
        return res.status(201).send({ message: 'User successfully created' });
    });
}
exports.registerNewUser = registerNewUser;
