import connection from "../database/db.js"

async function insertHashtag(name) {
    return connection.query('INSERT INTO hashtags (name) VALUES ($1) RETURNING id', [name])
}

async function selectHashtag(name) {
    return connection.query('SELECT * FROM hashtags WHERE name = $1', [name])
}

async function selectHashtags() {
    return connection.query(`
        SELECT h.*, COALESCE(COUNT(ph."hashtagId"), 0)::INT as "hashtagPostsCount"
        FROM hashtags h
        LEFT JOIN "postHashtags" ph ON h.id = ph."hashtagId" 
        GROUP BY h.id
        ORDER BY "hashtagPostsCount" DESC, h.id
    `)
}

export { insertHashtag, selectHashtag, selectHashtags }