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
exports.getUser = exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createPool_1 = require("../utils/createPool");
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: "Email and password are required" });
        return;
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const connection = yield createPool_1.pool.getConnection();
    yield connection.query("INSERT INTO users (email, password) VALUES (?, ?)", [email, hashedPassword]);
    connection.release();
    const token = jsonwebtoken_1.default.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const connection = yield createPool_1.pool.getConnection();
    const [rows] = yield connection.query("SELECT * FROM users WHERE email = ?", [email]);
    connection.release();
    if (rows.length === 0) {
        res.status(400).json({ error: "Invalid credentials" });
        return;
    }
    const user = rows[0];
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        res.status(400).json({ error: "Invalid credentials" });
        return;
    }
    const token = jsonwebtoken_1.default.sign({ email }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
});
exports.login = login;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(req.user);
});
exports.getUser = getUser;
