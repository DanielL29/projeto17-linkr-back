import { selectHashtags } from "../repositories/hashtagRepository.js"

async function getHashtags(req, res) {
    try {
        const { rows: hashtags } = await selectHashtags()

        res.send(hashtags)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

export { getHashtags }