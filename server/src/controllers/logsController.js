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
exports.getLogs = void 0;
const createPool_1 = require("../utils/createPool");
const getLogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield createPool_1.pool.getConnection();
        try {
            const [logRows] = yield connection.query('SELECT * FROM logs');
            if (logRows.length === 0) {
                return [];
            }
            res.status(200).json({ data: logRows });
        }
        finally {
            connection.release();
        }
    }
    catch (error) {
        console.error('Error in getLogs:', error);
        res.status(500).json({ error: 'Failed to fetch logs' });
    }
});
exports.getLogs = getLogs;
