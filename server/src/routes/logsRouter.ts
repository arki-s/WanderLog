import { Router } from "express";
import { getLogs } from "../controllers/logsController";

const logsRouter = Router();
logsRouter.get('/', getLogs);



export default logsRouter;
