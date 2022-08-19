import connection from "../database/db.js";

async function selectFollowers(followerId) {
    return connection.query('SELECT * FROM followers WHERE "followerId" = $1', [followerId])
} 

async function insertUserFollower(userId, followerId) {
    return connection.query('INSERT INTO followers ("userId", "followerId") VALUES ($1, $2)', [userId, followerId])
}

async function deleteUserFollower(userId, followerId) {
    return connection.query('DELETE FROM followers WHERE "userId" = $1 AND "followerId" = $2', [userId, followerId])
}

async function selectIfFollowUser(userId, followerId) {
    return connection.query('SELECT * FROM followers WHERE "userId" = $1 AND "followerId" = $2', [userId, followerId])
}

export { selectFollowers, insertUserFollower, deleteUserFollower, selectIfFollowUser }