import connection from "../database/db.js"

async function insertHashtag(name) {
    return connection.query('INSERT INTO hashtags (name) VALUES ($1) RETURNING id', [name])
}

async function selectHashtag(name) {
    return connection.query('SELECT * FROM hashtags WHERE name = $1', [name])
}

async function selectHashtags() {
    return connection.query('SELECT * FROM hashtags')
}

async function selectHashtagPosts(name) {
    return connection.query(`
        SELECT p.*, u.username 
        FROM "postHashtags" ph
        JOIN hashtags h ON h.id = ph."hashtagId"
        JOIN posts p ON p.id = ph."postId"
        JOIN users u ON u.id = p."ownerId"
        WHERE h.name = $1
        ORDER BY p.id DESC
        LIMIT 20
    `, [name])
}

export { insertHashtag, selectHashtag, selectHashtags, selectHashtagPosts }