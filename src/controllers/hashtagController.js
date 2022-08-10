import { selectHashtagPosts, selectHashtags } from "../repositories/hashtagRepository.js"

async function getHashtags(req, res) {
    try {
        const { rows: hashtags } = await selectHashtags()

        res.send(hashtags)
    } catch (err) {
        console.log(err)
        res.status(500).send('An error occured while trying to fetch the posts, please refresh the page')
    }
}

async function getHashtagPosts(req, res) {
    const { hashtag } = req.params

    try {
        const { rows: hashtagPosts } = await selectHashtagPosts(hashtag)

        res.send(hashtagPosts)
    } catch (err) {
        console.log(err)
        res.status(500).send('An error occured while trying to fetch the posts, please refresh the page')
    }
}

export { getHashtags, getHashtagPosts }