import connection from "./../database/db.js";

async function getUserByEmail(email) {
  const query = 'SELECT * FROM users WHERE email = $1;';
  const user = await connection.query(query, [email]);
  return user;
}

async function insertUser(user) {
  const { email, password, username, pictureUrl } = user;
  const query =
    'INSERT INTO users (email, password, username, "pictureUrl") VALUES ($1, $2, $3, $4);';
  await connection.query(query, [email, password, username, pictureUrl]);
}

async function searchingUsers(username, userId) {
  const query = `
    SELECT u.id, LOWER(u.username), u."pictureUrl", 
      CASE WHEN f."userId" = u.id AND f."followerId" = $2 THEN true ELSE false END AS "following"
    FROM users u
    LEFT JOIN followers f ON f."userId" = u.id AND f."followerId" = $2
    WHERE LOWER(username) LIKE $1
    ORDER BY f."userId", u.id;
    `;

  const data = await connection.query(query, [`${username}%`, userId]);
  return data;
}

async function selectUserById(id) {
  return connection.query('SELECT username, "pictureUrl" FROM users WHERE id = $1', [id])
}

export { getUserByEmail, insertUser, searchingUsers, selectUserById };
