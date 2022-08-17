import { Router } from 'express'
import authRouter from './authRouter.js'
import postRouter from './postRouter.js'
import hashtagRouter from './hashtagRouter.js'
import likeRouter from './likeRouter.js'
import commentRouter from './commentRouter.js'

const router = Router();

router.use(postRouter);
router.use(authRouter);
router.use(hashtagRouter);
router.use(likeRouter);
router.use(commentRouter);

export default router;
