"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tagsController_1 = require("../controllers/tagsController");
const tagsRouter = (0, express_1.Router)();
tagsRouter.get('/', tagsController_1.getTags);
tagsRouter.post('/', tagsController_1.createTags);
exports.default = tagsRouter;
