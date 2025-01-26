"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const logsController_1 = require("../controllers/logsController");
const logsRouter = (0, express_1.Router)();
logsRouter.get('/', logsController_1.getLogs);
exports.default = logsRouter;
