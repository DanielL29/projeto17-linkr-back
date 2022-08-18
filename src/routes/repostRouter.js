import { Router } from 'express'
import { postRepost } from '../controllers/repostController.js'
import validateJwtToken from '../middlewares/auth/validateJwtToken.js'

const repostRouter = Router()

repostRouter.post('/reposts/:postId/share', validateJwtToken, postRepost)

export default repostRouter