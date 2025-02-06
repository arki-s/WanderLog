import { Router } from "express";
import tagsRouter from "./tagsRouter";
import authRouter from "./authRouter";

const mainRouter = Router();

mainRouter.use('/tags', tagsRouter);
mainRouter.use('/auth', authRouter);

export default mainRouter;
