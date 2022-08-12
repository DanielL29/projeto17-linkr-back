import { Router } from 'express'
import { getPosts, publishPost, deletePostByUser, updatePostByUser} from '../controllers/postController.js'
import urlMetadatas from '../middlewares/urlMetadatas.js'
import validateSchema from '../middlewares/validations/validateSchema.js'

const postRouter = Router()

postRouter.post('/posts', validateSchema('post'), urlMetadatas, publishPost) 
postRouter.get('/posts', getPosts)
postRouter.put('/updatepost', updatePostByUser) // needs auth/token
postRouter.delete('/deletepost', deletePostByUser) 

export default postRouter