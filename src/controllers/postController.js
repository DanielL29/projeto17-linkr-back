import { insertHashtag, selectHashtag } from "../repositories/hashtagRepository.js"
import { insertPost, insertPostHashtags, selectPosts, updatePost, deletePost } from "../repositories/postRepository.js"

async function publishPost(req, res) {
    const post = req.body
    const { urlImage, urlDescription, urlTitle } = res.locals

    try {
        const { rows: postInserted } = await insertPost(post.url, post.description, urlImage, urlDescription, urlTitle, 2)

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
                        const { rows: hashtagInserted } = await insertHashtag(hashtags[i])
                        await insertPostHashtags(postInserted[0].id, hashtagInserted[0].id)
                    } else {
                        await insertPostHashtags(postInserted[0].id, hashtagFounded[0].id)
                    }
                }
            }
        }

        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.status(500).send('An error occured while trying to fetch the posts, please refresh the page')
    }
} 

async function getPosts(req, res) {
    const { hashtag, username } = req.query
    

    try {
        const { rows: posts } = await selectPosts(hashtag, username)

        res.send(posts)
    } catch (err) {
        console.log(err)
        res.status(500).send('An error occured while trying to fetch the posts, please refresh the page')
    }
}   

async function updatePostByUser(req, res) {
    const { postId, userId, description } = req.body
    console.log(typeof(description))
    try {
        const { rows: postUpdated } = await updatePost(description, postId, userId)

        res.status(200).send(postUpdated)
    } catch (err) {
        console.log(err)
        res.status(500).send('An error occured while trying to update the posts, please try again')
    }
}   

async function deletePostByUser(req, res) {
    const { postId, userId } = req.query
    
    try {
        await deletePost(postId, userId)
        return res.status(202).send("Delete post successfully")
    } catch (err) { 
        console.log(err)
        res.status(500).send('An error occured while trying delete the posts, please refresh the page and try again')
    }
}   

export { publishPost, getPosts, updatePostByUser, deletePostByUser }