import { Router } from 'express'
import authRouter from './authRouter.js'
import postRouter from './postRouter.js'
import hashtagRouter from './hashtagRouter.js'

const router = Router();

router.use(postRouter);
router.use(authRouter);
router.use(hashtagRouter)

export default router;
