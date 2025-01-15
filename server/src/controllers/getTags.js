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
exports.getTags = void 0;
const createPool_1 = require("../utils/createPool");
const getTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("getTags関数が呼び出されました！");
    try {
        const tags = yield getTagsData();
        console.log('fetched tags:', tags);
        res.status(200).json({ data: tags });
    }
    catch (error) {
        console.error('Error in getTags:', error);
        res.status(500).json({ error: 'Failed to fetch tags' });
    }
});
exports.getTags = getTags;
function getTagsData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const connection = yield createPool_1.pool.getConnection();
            try {
                const [tagRows] = yield connection.query('SELECT * FROM tags');
                console.log('Query result from database:', tagRows);
                if (tagRows.length === 0) {
                    return [];
                }
                return tagRows;
            }
            finally {
                connection.release();
            }
        }
        catch (error) {
            console.error('error fetching tag data', error);
            throw error;
        }
    });
}
