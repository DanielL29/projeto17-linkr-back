import { Router } from 'express'
import { getPosts, publishPost } from '../controllers/postController.js'
import validateSchema from '../middlewares/validations/validateSchema.js'

const postRouter = Router()

postRouter.post('/posts', validateSchema('post'), publishPost) // needs auth/token
postRouter.get('/posts', getPosts)

export default postRouter