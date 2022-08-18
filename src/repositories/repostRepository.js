import connection from "../database/db.js";

async function insertIntoPostsReposts(userId, postId, repost) {
    return connection.query('INSERT INTO "postsReposts" ("userId", "postId", repost) VALUES ($1, $2, $3)', [userId, postId, repost])
}

export { insertIntoPostsReposts }