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
exports.createTags = exports.getTags = void 0;
const createPool_1 = require("../utils/createPool");
const getTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const connection = yield createPool_1.pool.getConnection();
        try {
            const [tagRows] = yield connection.query('SELECT * FROM tags');
            if (tagRows.length === 0) {
                return [];
            }
            res.status(200).json({ data: tagRows });
        }
        finally {
            connection.release();
        }
    }
    catch (error) {
        console.error('Error in getTags:', error);
        res.status(500).json({ error: 'Failed to fetch tags' });
    }
});
exports.getTags = getTags;
const createTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId: userIdInput, name: nameInput } = req.body;
    if (!userIdInput || !nameInput) {
        return res.status(400).json({ error: 'UserId and Name are required' });
    }
    const userId = Number(userIdInput);
    const name = nameInput;
    try {
        const connection = yield createPool_1.pool.getConnection();
        try {
            const [validName] = yield connection.query('SELECT Id FROM tags WHERE UserId = ? AND Name = ?', [userId, name]);
            if (validName.length > 0) {
                return res.status(400).json({ error: 'Same tag already exsits' });
            }
            const [result] = yield connection.query('INSERT INTO tags (UserId, Name) VALUES (?, ?)', [userId, name]);
            res.status(200).json({ success: true, tagId: result.insertId, userId, name });
        }
        finally {
            connection.release();
        }
    }
    catch (error) {
        console.error('Error in createTags:', error);
        res.status(500).json({ error: 'Failed to add tag' });
    }
});
exports.createTags = createTags;
