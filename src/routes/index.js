import { Router } from "express";
import authRouter from "./authRouter";
import postRouter from "./postRouter";

const router = Router();

router.use(postRouter);
router.use(authRouter);

export default router;