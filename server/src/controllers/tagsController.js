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
exports.deleteTags = exports.updateTags = exports.createTags = exports.getTags = void 0;
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
const updateTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId: userIdInput, name: nameInput } = req.body;
    const { id: tagIdInput } = req.params;
    if (!userIdInput || !tagIdInput || !nameInput) {
        return res.status(400).json({ error: 'UserId, TagId and Name are required' });
    }
    const userId = Number(userIdInput);
    const tagId = Number(tagIdInput);
    const name = nameInput;
    try {
        const connection = yield createPool_1.pool.getConnection();
        try {
            const [validTag] = yield connection.query('SELECT Id FROM tags WHERE Id = ? AND UserId = ?', [tagId, userId]);
            if (validTag.length === 0) {
                return res.status(400).json({ error: 'Tag not found' });
            }
            const [validName] = yield connection.query('SELECT Id FROM tags WHERE UserId = ? AND Name = ?', [userId, name]);
            if (validName.length > 0) {
                return res.status(400).json({ error: 'Same tag already exsits' });
            }
            const [result] = yield connection.query('UPDATE tags SET name = ? WHERE Id = ?', [name, tagId]);
            res.status(200).json({ success: true, tagId, userId, name });
        }
        finally {
            connection.release();
        }
    }
    catch (error) {
        console.error('Error in updateTags:', error);
        res.status(500).json({ error: 'Failed to update tag' });
    }
});
exports.updateTags = updateTags;
const deleteTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { userId } = req.query;
    if (!userId || !id) {
        return res.status(400).json({ error: 'UserId, TagId are required' });
    }
    const UserId = Number(userId);
    const tagId = Number(id);
    try {
        const connection = yield createPool_1.pool.getConnection();
        try {
            const [validTag] = yield connection.query('SELECT Id FROM tags WHERE Id = ? AND UserId = ?', [tagId, UserId]);
            if (validTag.length === 0) {
                return res.status(400).json({ error: 'Tag not found' });
            }
            const [result] = yield connection.query('DELETE FROM tags WHERE Id = ?', [tagId]);
            res.status(200).json({ success: true, tagId, UserId });
        }
        finally {
            connection.release();
        }
    }
    catch (error) {
        console.error('Error in deleteTags:', error);
        res.status(500).json({ error: 'Failed to delete tag' });
    }
});
exports.deleteTags = deleteTags;
