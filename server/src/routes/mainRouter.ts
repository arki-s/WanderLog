import { Router } from "express";
import tagsRouter from './getTags';

const mainRouter = Router();

mainRouter.use('/tags', tagsRouter);

export default mainRouter;
