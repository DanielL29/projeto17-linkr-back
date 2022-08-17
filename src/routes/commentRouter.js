import { Router } from 'express'
import { postComment } from '../controllers/commentController.js'
import validateJwtToken from './../middlewares/auth/validateJwtToken.js'
import validateSchema from './../middlewares/validations/validateSchema.js'

const commentRouter = Router()

commentRouter.post('/comments/:postId/publish', validateJwtToken, validateSchema('comment'), postComment)

export default commentRouter