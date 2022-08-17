import { Router } from 'express'
import { getPosts, publishPost, deletePostByUser, updatePostByUser} from '../controllers/postController.js'
import validateJwtToken from '../middlewares/auth/validateJwtToken.js'
import urlMetadatas from '../middlewares/urlMetadatas.js'
import validateSchema from '../middlewares/validations/validateSchema.js'
import verifyIfHaveHashtags from '../middlewares/verifyIfHaveHashtags.js'

const postRouter = Router()

postRouter.post('/posts', validateJwtToken, validateSchema('post'), urlMetadatas, verifyIfHaveHashtags, publishPost) 
postRouter.get('/posts', validateJwtToken, getPosts)
postRouter.patch('/posts/:postId', validateJwtToken, verifyIfHaveHashtags, updatePostByUser)
postRouter.delete('/posts/:postId', validateJwtToken, deletePostByUser) 

export default postRouter