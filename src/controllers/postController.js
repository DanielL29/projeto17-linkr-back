import { insertHashtag, selectHashtag } from "../repositories/hashtagRepository.js"
import { insertPost, insertPostHashtags, selectPosts, updatePost, deletePost, selectPostHashtags, deletePostHashtags } from "../repositories/postRepository.js"

async function publishPost(req, res) {
    const post = req.body
    const { urlImage, urlDescription, urlTitle, user, hashtags } = res.locals

    try {
        const { rows: postInserted } = await insertPost(post.url, post.description, urlImage, urlDescription, urlTitle, user)

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

        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.status(500).send('An error occured while trying to fetch the posts, please refresh the page')
    }
} 

async function getPosts(req, res) {
    const { hashtag, username } = req.query
    const { user } = res.locals
    
    try {
        const { rows: posts } = await selectPosts(hashtag, username, user)

        res.status(200).send(posts)
    } catch (err) { 
        console.log(err)
        res.status(500).send('An error occured while trying to fetch the posts, please refresh the page')
    }
}   

async function updatePostByUser(req, res) {
    const { description } = req.body
    const { postId } = req.params
    const { user, hashtags, postHashtags } = res.locals

    try {
        await updatePost(description, postId, user)

        if(hashtags.length > 0) {
            for(let i = 0; i < hashtags.length; i++) {
                const { rows: hashtagFounded } = await selectHashtag(hashtags[i])

                if(hashtagFounded.length === 0) {
                    const { rows: hashtagInserted } = await insertHashtag(hashtags[i])
                    await insertPostHashtags(postId, hashtagInserted[0].id)
                } else {
                    const { rowCount: hashtagBelong } = await selectPostHashtags(postId, hashtagFounded[0].id)

                    if(hashtagBelong === 0) {
                        await insertPostHashtags(postId, hashtagFounded[0].id)
                    }
                }
            }

            for(let i = 0; i < postHashtags.length; i++) {
                if(!hashtags.includes(postHashtags[i])) {
                    const { rows: hashtagFounded } = await selectHashtag(postHashtags[i])

                    await deletePostHashtags(postId, hashtagFounded[0].id)
                }
            }
        }

        res.sendStatus(200)
    } catch (err) {
        console.log(err)
        res.status(500).send('An error occured while trying to update the posts, please try again')
    }
}   

async function deletePostByUser(req, res) {
    const { postId } = req.params
    const { user } = res.locals
    
    try {        
        await deletePost(postId, user) 
        
        return res.status(202).send("Delete post successfully")
    } catch (err) { 
        console.log(err)
        res.status(500).send('An error occured while trying delete the posts, please refresh the page and try again')
    }
}

async function updateNumberOfPosts(_req, res) {
    
}

export { publishPost, getPosts, updatePostByUser, deletePostByUser }