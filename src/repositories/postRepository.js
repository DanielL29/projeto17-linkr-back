import connection from '../database/db.js'

async function insertPost(url, description = '', userId) {
    return connection.query('INSERT INTO posts (url, description, "ownerId") VALUES ($1, $2, $3) RETURNING id', [url, description, userId])
}

async function insertPostHashtags(postId, hashtagId) {
    connection.query('INSERT INTO "postHashtags" ("postId", "hashtagId") VALUES ($1, $2)', [postId, hashtagId])
}

async function selectPosts() {
    return connection.query(`
        SELECT p.id, u.name AS username, p.url, p.description 
        FROM posts p 
        JOIN users u ON p."ownerId" = u.id 
        ORDER BY p.id DESC 
        LIMIT 20
    `)
}

export { insertPost, insertPostHashtags, selectPosts }