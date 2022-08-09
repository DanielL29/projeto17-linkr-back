import connection from "./../database/db.js";

async function getUserByEmail(email) {
    const query = "SELECT * FROM users WHERE email = $1;";
    const user = await connection.query(query, [email]);
    return user;
}