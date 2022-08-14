import { Router } from 'express'
import { getHashtags } from '../controllers/hashtagController.js'
import validateJwtToken from '../middlewares/auth/validateJwtToken.js'

const hashtagRouter = Router()

hashtagRouter.get('/hashtags', validateJwtToken, getHashtags)

export default hashtagRouter