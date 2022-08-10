import connection from '../database/db.js'

async function insertPost(url, description = '', urlImage, urlDescription, urlTitle, userId) {
    return connection.query(`
        INSERT INTO posts 
            (url, description, "urlImage", "urlDescription", "urlTitle", "ownerId")
            VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING id
    `, [url, description, urlImage, urlDescription, urlTitle, userId])
}

async function insertPostHashtags(postId, hashtagId) {
    connection.query('INSERT INTO "postHashtags" ("postId", "hashtagId") VALUES ($1, $2)', [postId, hashtagId])
}

async function selectPosts() {
    return connection.query(`
        SELECT p.*, u.username
        FROM posts p 
        JOIN users u ON p."ownerId" = u.id 
        ORDER BY p.id DESC 
        LIMIT 20
    `)
}

export { insertPost, insertPostHashtags, selectPosts }