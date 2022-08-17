import connection from './../database/db.js'

async function insertComment(userId, postId, description) {
    return connection.query('INSERT INTO comments ("userId", "postId", description) VALUES ($1, $2, $3)', [userId, postId, description])
}

async function selectComments(userId, postId) {
    
}

export { insertComment, selectComments }