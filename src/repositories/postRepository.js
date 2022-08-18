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
  return connection.query(
    'INSERT INTO "postHashtags" ("postId", "hashtagId") VALUES ($1, $2)',
    [postId, hashtagId]
  );
}

async function selectPosts(hashtag, username, userId) {
  if (hashtag) {
    return connection.query(
    `
      SELECT pr.id, p.id AS "postId", p.url, p.description, p."ownerId", p."urlImage", p."urlTitle", p."urlDescription", u."pictureUrl", u.username,
      pr."userId", pr.repost, u2.username AS "postRepostUser", 
      (SELECT COALESCE(COUNT(l."userId"), 0)::INT AS "likesCount" FROM likes l JOIN posts p2 ON p2.id = l."postId" WHERE p.id = p2.id), 
      (SELECT COALESCE(COUNT(c."postId"), 0)::INT AS "commentsCount" FROM comments c WHERE c."postId" = p.id),
      (SELECT COALESCE(COUNT(pr."postId"), 0)::INT AS "repostsCount" FROM "postsReposts" pr WHERE pr."postId" = p.id AND repost = true),
        (
          SELECT COALESCE(JSON_AGG(u.username), '[]') AS "usersWhoLiked"
          FROM users u 
          JOIN likes l ON u.id = l."userId" 
          WHERE p.id = l."postId"
        ),             
      CASE   
        WHEN u.id = $1 THEN true                 
        ELSE false               
      END AS "userPost"             
      FROM "postHashtags" ph             
      JOIN hashtags h ON h.id = ph."hashtagId"
      JOIN "postsReposts" pr ON ph."postId" = pr."postId"             
      JOIN posts p ON p.id = pr."postId"             
      JOIN users u ON u.id = p."ownerId"
      JOIN users u2 ON u2.id = pr."userId"                         
      WHERE h.name = $2             
      GROUP BY p.id, u.id, u2.id, pr.id             
      ORDER BY pr.id DESC             
      LIMIT 20;
    `,
      [userId, hashtag]
    );
  } else if (username) {
    return connection.query(
    `
      SELECT pr.id, p.id AS "postId", p.url, p.description, p."ownerId", p."urlImage", p."urlTitle", p."urlDescription", u."pictureUrl", u.username,
      pr."userId", pr.repost, u2.username AS "postRepostUser", 
      (SELECT COALESCE(COUNT(l."userId"), 0)::INT AS "likesCount" FROM likes l JOIN posts p2 ON p2.id = l."postId" WHERE p.id = p2.id), 
      (SELECT COALESCE(COUNT(c."postId"), 0)::INT AS "commentsCount" FROM comments c WHERE c."postId" = p.id),
      (SELECT COALESCE(COUNT(pr."postId"), 0)::INT AS "repostsCount" FROM "postsReposts" pr WHERE pr."postId" = p.id AND repost = true),
        (
          SELECT COALESCE(JSON_AGG(u.username), '[]') AS "usersWhoLiked" 
          FROM users u 
          JOIN likes l ON l."userId" = u.id 
          WHERE l."postId" = p.id
        ),
      CASE   
        WHEN u.id = $1 THEN true                 
        ELSE false               
      END AS "userPost"
      FROM "postsReposts" pr 
      JOIN posts p ON p.id = pr."postId"
      JOIN users u ON p."ownerId" = u.id
      JOIN users u2 ON u2.id = pr."userId"
      WHERE u.id = $2
      GROUP BY p.id, u.id, u2.id, pr.id
      ORDER BY pr.id DESC
      LIMIT 20
    `,
      [userId, username]
    );
  } else {
    return connection.query(
    `
      SELECT pr.id, p.id AS "postId", p.url, p.description, p."ownerId", p."urlImage", p."urlTitle", p."urlDescription", u."pictureUrl", u.username,
      pr."userId", pr.repost, u2.username AS "postRepostUser", 
      (SELECT COALESCE(COUNT(l."userId"), 0)::INT AS "likesCount" FROM likes l JOIN posts p2 ON p2.id = l."postId" WHERE p.id = p2.id), 
      (SELECT COALESCE(COUNT(c."postId"), 0)::INT AS "commentsCount" FROM comments c WHERE c."postId" = p.id),
      (SELECT COALESCE(COUNT(pr."postId"), 0)::INT AS "repostsCount" FROM "postsReposts" pr WHERE pr."postId" = p.id AND repost = true),
        (
          SELECT COALESCE(JSON_AGG(u.username), '[]') AS "usersWhoLiked" 
          FROM users u 
          JOIN likes l ON l."userId" = u.id 
          WHERE l."postId" = p.id
        ),
      CASE   
        WHEN u.id = $1 THEN true                 
        ELSE false               
      END AS "userPost" 
      FROM "postsReposts" pr
      JOIN posts p ON p.id = pr."postId" 
      JOIN users u ON u.id = p."ownerId"
      JOIN users u2 ON u2.id = pr."userId"
      JOIN followers f ON f."userId" = pr."userId" 
      WHERE f."followerId" = $1 OR pr."userId" = $1
      GROUP BY p.id, u.id, pr.id, u2.id
      ORDER BY pr.id DESC 
      LIMIT 20
    `, [userId]
    );
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
  return connection.query(
    'DELETE FROM "postHashtags" WHERE "postId" = $1 AND "hashtagId" = $2',
    [postId, hashtagId]
  );
}

async function deletePost(postId, userId) {
  await connection.query(
    `DELETE FROM "postHashtags" WHERE "postId" = $1`,
    [postId]
  );
  await connection.query(
    `
  DELETE FROM posts 
  WHERE id = $1 AND "ownerId" = $2
`,
    [postId, userId]
 ); 
}

async function getNewPosts(lastPostId, userId) {
  const query = `SELECT * FROM "postsReposts"
    JOIN followers ON followers."userId" = "postsReposts"."userId"
    WHERE id > $1 AND followers."followerId" = $2 OR "postsReposts"."userId" = $2;`;
  const { rowCount: count } = await connection.query(query, [lastPostId, userId]);
  return count;
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
  getNewPosts  
};