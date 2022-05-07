"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("config"));
const PORT = config_1.default.get('PORT');
const app = (0, express_1.default)();
app.post('/hello', (req, res) => {
    return res.status(200).send({ "MESSAGE": "HELLO, WORLD!" });
});
app.listen(PORT);
