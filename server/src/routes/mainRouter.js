"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tagsRouter_1 = __importDefault(require("./tagsRouter"));
const mainRouter = (0, express_1.Router)();
mainRouter.use('/tags', tagsRouter_1.default);
exports.default = mainRouter;
