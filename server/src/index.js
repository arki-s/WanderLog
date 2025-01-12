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
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const createPool_1 = require("./utils/createPool");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
dotenv_1.default.config();
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE', 'HEAD'],
    allowedHeaders: ['Content-Type', 'X-Requested-With', 'Authorization'],
}));
app.get('/logs', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [rows] = yield createPool_1.pool.query('SELECT * FROM logs');
        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Database query failed');
    }
}));
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.get('/ping', (req, res) => {
    res.status(200).send('pong');
});
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
