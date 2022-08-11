import { Router } from 'express'
import { getHashtags } from '../controllers/hashtagController.js'

const hashtagRouter = Router()

hashtagRouter.get('/hashtags', getHashtags)

export default hashtagRouter