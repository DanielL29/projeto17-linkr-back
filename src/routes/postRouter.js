import { Router } from 'express'
import { getPosts, publishPost } from '../controllers/postController.js'
import urlMetadatas from '../middlewares/urlMetadatas.js'
import validateSchema from '../middlewares/validations/validateSchema.js'

const postRouter = Router()

postRouter.post('/posts', validateSchema('post'), urlMetadatas, publishPost) // needs auth/token
postRouter.get('/posts', getPosts)

export default postRouter