import { Router } from 'express'
import { getPosts, publishPost } from '../controllers/postController.js'
import validateSchema from '../middlewares/validations/validateSchema.js'

const router = Router()

router.post('/posts', validateSchema('post'), publishPost) // needs auth/token
router.get('/posts', getPosts) // needs auth/token

export default router