import { insertComment, selectComments } from "../repositories/commentRepository.js"

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

async function getComments(req, res) {
    const { postId } = req.params

    try {
        const { rows: comments } = await selectComments(postId)

        res.status(200).send(comments)
    } catch (err) {
        console.log(err)
        res.status(500).send('An error occured while trying to fetch the posts, please refresh the page')
    }
}

export { postComment, getComments }