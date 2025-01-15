import { Router } from "express";
import { getTags } from "../controllers/getTags";

const tagsRouter = Router();
tagsRouter.get('/', getTags);

export default tagsRouter;
