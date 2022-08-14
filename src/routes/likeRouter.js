import { Router } from "express";
import { dislike, getLikes, like } from "../controllers/likeController.js";
import validateJwtToken from "./../middlewares/auth/validateJwtToken.js";

const likeRouter = Router();

likeRouter.post("/like", validateJwtToken, like);
likeRouter.delete("/dislike", validateJwtToken, dislike);
likeRouter.get("/likes/:id", validateJwtToken, getLikes);

export default likeRouter;