import { insertComment } from "../repositories/commentRepository.js"

async function postComment(req, res) {
    const { postId } = req.params
    const { user } = res.locals
    const { description } = req.body

    try {
        await insertComment(user, postId, description)

        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.status(500).send('An error occured while trying to fetch the posts, please refresh the page')
    }
}

export { postComment }