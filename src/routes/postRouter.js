import { Router } from 'express'
import { getPosts, publishPost, deletePostByUser} from '../controllers/postController.js'
import validateJwtToken from '../middlewares/auth/validateJwtToken.js'
import urlMetadatas from '../middlewares/urlMetadatas.js'
import validateSchema from '../middlewares/validations/validateSchema.js'

const postRouter = Router()

postRouter.post('/posts', validateSchema('post'), urlMetadatas, publishPost) 
postRouter.get('/posts', getPosts)
postRouter.delete('/deletepost', validateJwtToken, deletePostByUser) 

export default postRouter