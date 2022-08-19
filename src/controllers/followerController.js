import { deleteUserFollower, insertUserFollower, selectIfFollowUser } from "../repositories/followerRepository.js"

async function followUser(req, res) {
    const { userId } = req.params
    const { user } = res.locals

    try {
        await insertUserFollower(userId, user)

        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function unfollowUser(req, res) {
    const { userId } = req.params
    const { user } = res.locals

    try {
        await deleteUserFollower(userId, user)

        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function getUserFollower(req, res) {
    const { userId } = req.params
    const { user } = res.locals

    try {
        const { rowCount: userFollow } = await selectIfFollowUser(userId, user)

        res.status(200).send({ userFollow })
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export { followUser, unfollowUser, getUserFollower }