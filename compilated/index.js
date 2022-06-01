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
exports.PROJECT_DIRECTION = void 0;
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("config"));
const register_1 = require("./router/api/register");
const auth_1 = require("./router/api/auth");
const uploadNewSong_1 = require("./router/media/uploadNewSong");
const multer_1 = __importDefault(require("multer"));
const getSongList_1 = require("./router/media/getSongList");
const cors_1 = __importDefault(require("cors"));
const getSingleSong_1 = require("./router/media/getSingleSong");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const upload = (0, multer_1.default)({ dest: 'uploads/' });
const app = (0, express_1.default)();
exports.PROJECT_DIRECTION = __dirname;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            app.listen(config_1.default.get('PORT'), () => console.log(`Server started at port ${config_1.default.get('PORT')}`));
            mongoose_1.default.connect(config_1.default.get('mongoDBsecret'), (error) => {
                if (error) {
                    throw error;
                }
                else {
                    console.log('Connected to MongoDB');
                }
            });
        }
        catch (error) {
            throw error;
        }
    });
}
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.post('/api/register', register_1.registerNewUser);
app.post('/api/auth', auth_1.authUser);
app.post('/meida/uploadNewSong', upload.single('song'), uploadNewSong_1.uploadNewSong);
app.get('/media/getSongList', getSongList_1.getSongList);
app.get('/media/getSingleSong', getSingleSong_1.getSingleSong);
startServer();
