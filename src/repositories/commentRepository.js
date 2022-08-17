import connection from './../database/db.js'

async function insertComment(userId, postId, description) {
    return connection.query('INSERT INTO comments ("userId", "postId", description) VALUES ($1, $2, $3)', [userId, postId, description])
}

async function selectComments(postId) {
    return connection.query(`
        SELECT u.username, u."pictureUrl", c.description,
            CASE WHEN u.id = p."ownerId" THEN true ELSE false END AS "postAuthor",
            CASE WHEN u.id = f."followerId" THEN true ELSE false END AS "following"
        FROM comments c
        JOIN users u ON u.id = c."userId"
        JOIN posts p ON p.id = c."postId"
        LEFT JOIN followers f ON f."userId" = p."ownerId"
        WHERE p.id = $1
        ORDER BY c.id
    `, [postId])
}

export { insertComment, selectComments }