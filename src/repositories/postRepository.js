import connection from "../database/db.js";

async function insertPost(
  url,
  description = "",
  urlImage,
  urlDescription,
  urlTitle,
  userId
) {
  return connection.query(
    `
        INSERT INTO posts 
            (url, description, "urlImage", "urlDescription", "urlTitle", "ownerId")
            VALUES ($1, $2, $3, $4, $5, $6) 
        RETURNING id
    `,
    [url, description, urlImage, urlDescription, urlTitle, userId]
  );
}

async function insertPostHashtags(postId, hashtagId) {
  connection.query(
    'INSERT INTO "postHashtags" ("postId", "hashtagId") VALUES ($1, $2)',
    [postId, hashtagId]
  );
}

async function selectPosts(hashtag, username) {
  if (hashtag) {
    return connection.query(
      `
            SELECT p.*, u.username, u."pictureUrl" 
            FROM "postHashtags" ph
            JOIN hashtags h ON h.id = ph."hashtagId"
            JOIN posts p ON p.id = ph."postId"
                JOIN users u ON u.id = p."ownerId"
            WHERE h.name = $1
            ORDER BY p.id DESC
            LIMIT 20
        `,
      [hashtag]
    );
  } else if (username) {
    return connection.query(
      `
            SELECT p.*, u.username, u."pictureUrl"
            FROM posts p 
            JOIN users u ON p."ownerId" = u.id
            WHERE u.id = $1
            ORDER BY p.id DESC
            LIMIT 20
        `,
      [username]
    );
  } else {
    return connection.query(`
            SELECT p.*, u.username, u."pictureUrl"
            FROM posts p 
            JOIN users u ON p."ownerId" = u.id 
            ORDER BY p.id DESC 
            LIMIT 20
        `);
  }
}

async function updatePost(description, postId, userId) {
  return connection.query(
    `
    UPDATE posts p
    SET description = $1 
    WHERE p.id = $2 AND p."ownerId" = $3
  `,
    [description, postId, userId]
  );
}

async function selectPostHashtags(postId, hashtagId) {
  return connection.query(
    `
        SELECT * 
        FROM "postHashtags" ph
        WHERE ph."postId" = $1 
        AND ph."hashtagId" = $2 
    `,
    [postId, hashtagId]
  );
}

async function selectPost(postId) {
  return connection.query("SELECT description FROM posts WHERE id = $1", [
    postId,
  ]);
}

async function deletePostHashtags(postId, hashtagId) {
  connection.query(
    'DELETE FROM "postHashtags" WHERE "postId" = $1 AND "hashtagId" = $2',
    [postId, hashtagId]
  );
}

async function deletePost(postId, userId) {

  await connection.query(
    `
  DELETE FROM posts
  WHERE id = $1 AND "ownerId" = $2
`,
    [postId, userId]
  );

  await connection.query(
    `DELETE FROM "postHashtags" WHERE "postId" = $1`,
    [postId]
  );
}

export {
  insertPost,
  insertPostHashtags,
  selectPosts,
  updatePost,
  deletePost,
  selectPostHashtags,
  selectPost,
  deletePostHashtags,
};
