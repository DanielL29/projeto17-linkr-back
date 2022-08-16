import { selectPost } from "../repositories/postRepository.js"

async function verifyIfHaveHashtags(req, res, next) {
    const { description } = req.body
    const { postId } = req.params
    let hashtags = []
    let postHashtags = []

    if(description) {
        const treatDescription = description.split('#')

        for(let i = 1; i < treatDescription.length; i++) {
            const str = treatDescription[i]
            hashtags.push(str.split(' ')[0].trim())
        }
        console.log(hashtags)

        if(postId) {
            const { rows: post } = await selectPost(postId)
            const postDescription = post[0].description.split('#')

            for(let i = 1; i < postDescription.length; i++) {
                const str = postDescription[i]
                postHashtags.push(str.split(' ')[0].trim())
            }
        }
    }

    res.locals.hashtags = hashtags
    res.locals.postHashtags = postHashtags

    next()
}

export default verifyIfHaveHashtags