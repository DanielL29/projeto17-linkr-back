import connection from "../database/db.js"

async function insertHashtag(name) {
    return connection.query('INSERT INTO hashtags (name) VALUES ($1) RETURNING id', [name])
}

async function selectHashtag(name) {
    return connection.query('SELECT * FROM hashtags WHERE name = $1', [name])
}

export { insertHashtag, selectHashtag }