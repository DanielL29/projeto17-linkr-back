import connection from "./../database/db.js";

async function likePost(postId, userId) {
    const query = `INSERT INTO likes ("postId", "userId") VALUES ($1, $2);`;
    await connection.query(query, [postId, userId]);
}

async function dislikePost(postId, userId) {
    const query = `DELETE FROM likes WHERE "postId" = $1 AND "userId" = $2;`;
    await connection.query(query, [postId, userId]);
}

async function getUserLikes(id) {
    const query = `SELECT "postId" FROM likes WHERE "userId" = $1;`;
    const { rows: likes } = await connection.query(query, [id]);
    return likes;
}

async function getAllLikes() {
    const query = `SELECT users.username, likes."postId", users.id FROM likes JOIN users ON likes."userId" = users.id;`;
    const { rows: likes } = await connection.query(query);
    return likes;
}

export { likePost, dislikePost, getUserLikes, getAllLikes };