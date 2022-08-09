import connection from "./../database/db.js";

async function getUserByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1;';
    const user = await connection.query(query, [email]);
    return user;
}

async function insertUser(user) {
    const { email, password, username, pictureUrl } = user;
    const query = 'INSERT INTO users (email, password, username, "pictureUrl") VALUES ($1, $2, $3, $4);';
    await connection.query(query, [email, password, username, pictureUrl]);
}

export { getUserByEmail, insertUser };