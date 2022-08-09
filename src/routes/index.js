import { Router } from 'express'
import postRouter from './postRouter.js'

const router = Router();

router.use(postRouter);
router.use(authRouter);

export default router;