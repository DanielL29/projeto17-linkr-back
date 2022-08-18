import connection from "../database/db.js";

async function selectFollowers(followerId) {
    return connection.query('SELECT * FROM followers WHERE "followerId" = $1', [followerId])
} 

export { selectFollowers }