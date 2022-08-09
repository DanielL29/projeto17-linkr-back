import { insertHashtag, selectHashtag } from "../repositories/hashtagRepository.js"
import { insertPost, insertPostHashtags, selectPosts } from "../repositories/postRepository.js"

async function publishPost(req, res) {
    const post = req.body

    try {
        const { rows: postInserted } = await insertPost(post.url, post.description, 1)

        if(post.description) {
            let hashtags = []
            const treatDescription = post.description.split(' ')

            for(let i = 0; i < treatDescription.length; i++) {
                const str = treatDescription[i]
                if(str.startsWith('#')) {
                    hashtags.push(str.replace('#', ''))
                }
            }

            if(hashtags.length > 0) {
                for(let i = 0; i < hashtags.length; i++) {
                    const { rows: hashtagFounded } = await selectHashtag(hashtags[i])

                    if(hashtagFounded.length === 0) {
                        await insertHashtag(hashtags[i])
                    }

                    await insertPostHashtags(postInserted[0].id, hashtagFounded[0].id)
                }
            }
        }

        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.status(500).send(err)
    }
}

async function getPosts(req, res) {
    try {
        const { rows: posts } = await selectPosts()

        res.send(posts)
    } catch (err) {
        res.status(500).send(err)
    }
}   

export { publishPost, getPosts }