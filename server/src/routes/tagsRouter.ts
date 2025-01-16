import { Router } from "express";
import { getTags, createTags } from "../controllers/tagsController";

const tagsRouter = Router();
tagsRouter.get('/', getTags);
tagsRouter.post('/', createTags);


export default tagsRouter;
