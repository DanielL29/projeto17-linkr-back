import { Router } from 'express'
import { getHashtagPosts, getHashtags } from '../controllers/hashtagController.js'

const hashtagRouter = Router()

hashtagRouter.get('/hashtags', getHashtags)
hashtagRouter.get('/hashtags/:hashtagId', getHashtagPosts)

export default hashtagRouter