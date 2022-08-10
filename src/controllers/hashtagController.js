import { selectHashtagPosts, selectHashtags } from "../repositories/hashtagRepository.js"

async function getHashtags(req, res) {
    try {
        const { rows: hashtags } = await selectHashtags()

        res.send(hashtags)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function getHashtagPosts(req, res) {
    const { hashtagId } = req.params

    try {
        const { rows: hashtagPosts } = await selectHashtagPosts(hashtagId)

        res.send(hashtagPosts)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export { getHashtags, getHashtagPosts }