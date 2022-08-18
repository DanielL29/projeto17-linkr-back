import { insertIntoPostsReposts } from "../repositories/repostRepository.js"

async function postRepost(req, res) {
    const { postId } = req.params
    const { user } = res.locals

    try {
        await insertIntoPostsReposts(user, postId, true)

        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export { postRepost }