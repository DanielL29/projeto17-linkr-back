import { dislikePost, getUserLikes, likePost } from "./../repositories/likeRepository.js";

async function like(req, res) {
    const { postId } = req.body,
        userId = res.locals.user;
    try {
        await likePost(postId, userId);
        res.sendStatus(201);
    } catch {
        res.sendStatus(500);
    }
}

async function dislike(req, res) {
    const { id } = req.params,
        userId = res.locals.user;
    try {
        await dislikePost(id, userId);
        res.sendStatus(200);
    } catch {
        res.sendStatus(500);
    }
}

async function getLikes(_req, res) {
    const userId = res.locals.user;
    try {
        const likes = await getUserLikes(userId);
        res.send(likes);
    } catch {
        res.sendStatus(500);
    }
}

export { like, dislike, getLikes };