import connection from '../database/db.js'

async function insertPost(url, description = '', userId) {
    return connection.query('INSERT INTO posts (url, description, "ownerId") VALUES ($1, $2, $3) RETURNING id', [url, description, userId])
}

async function insertPostHashtags(postId, hashtagId) {
    connection.query('INSERT INTO "postHashtags" ("postId", "hashtagId") VALUES ($1, $2)', [postId, hashtagId])
}

async function selectPosts() {
    return connection.query('SELECT id, url, description FROM posts ORDER BY id DESC LIMIT 20')
}

export { insertPost, insertPostHashtags, selectPosts }