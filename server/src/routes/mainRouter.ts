import { Router } from "express";
import tagsRouter from "./tagsRouter";

const mainRouter = Router();

mainRouter.use('/tags', tagsRouter);

export default mainRouter;
