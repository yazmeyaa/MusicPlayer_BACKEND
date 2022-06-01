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
exports.authUser = void 0;
const User_1 = require("../../models/User");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("config"));
function authUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(403).send({ error: 'username and password is required' });
        }
        const isUserExist = yield User_1.User.findOne({ username: username });
        if (!isUserExist) {
            return res.status(403).send({ error: 'wrong username or password' });
        }
        if (password !== isUserExist.password) {
            return res.status(403).send({ error: 'wrong username or password' });
        }
        const userToken = jsonwebtoken_1.default.sign({ messageToHacker: 'why do you look this string?' }, config_1.default.get('JWTsecret'), { expiresIn: '1d' });
        res.cookie('JWT', userToken, {
            expires: new Date(Date.now() + (1000 * 60 * 60 * 24)),
            httpOnly: true
        });
        return res.status(200).send({
            message: 'successfully authorised'
        });
    });
}
exports.authUser = authUser;
