import { Router } from 'express'
import { followUser, getUserFollower, unfollowUser } from '../controllers/followerController.js';
import validateJwtToken from './../middlewares/auth/validateJwtToken.js';

const followerRouter = Router()

followerRouter.post('/followers/:userId/follow', validateJwtToken, followUser)
followerRouter.post('/followers/:userId/unfollow', validateJwtToken, unfollowUser)
followerRouter.get('/followers/:userId', validateJwtToken, getUserFollower)

export default followerRouter