import { Router } from "express";
import { getTags, createTags, updateTags, deleteTags } from "../controllers/tagsController";

const tagsRouter = Router();
tagsRouter.get('/', getTags);
tagsRouter.post('/', createTags);
tagsRouter.put('/:id', updateTags);
tagsRouter.delete('/:id', deleteTags);


export default tagsRouter;
