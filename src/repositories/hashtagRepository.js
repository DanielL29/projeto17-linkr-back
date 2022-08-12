import connection from "../database/db.js"

async function insertHashtag(name) {
    return connection.query('INSERT INTO hashtags (name) VALUES ($1) RETURNING id', [name])
}

async function selectHashtag(name) {
    return connection.query('SELECT * FROM hashtags WHERE name = $1', [name])
}

async function selectHashtags() {
    return connection.query(`
        SELECT h.*, COUNT(ph."hashtagId") as "hashtagPostsCount"
        FROM "postHashtags" ph
        JOIN hashtags h ON h.id = ph."hashtagId" 
        GROUP BY h.id
        ORDER BY "hashtagPostsCount" DESC, h.id
    `)
}

export { insertHashtag, selectHashtag, selectHashtags }