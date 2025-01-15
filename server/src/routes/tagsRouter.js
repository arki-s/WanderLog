"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const getTags_1 = require("../controllers/getTags");
const tagsRouter = (0, express_1.Router)();
tagsRouter.get('/', getTags_1.getTags);
exports.default = tagsRouter;
