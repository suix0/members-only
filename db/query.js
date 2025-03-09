const db = require("./pool");

// GET: Find a specific username if it exists
exports.getUsername = async (username) => {
  const { rows } = await db.query("SELECT * FROM users WHERE user_name = $1", [
    username,
  ]);
  return rows[0];
};

// POST: Post the newly registered user
exports.postNewUser = async (user) => {
  await db.query(
    `
    INSERT INTO users (first_name, last_name, user_name, password_hash)
    VALUES ($1, $2, $3, $4)
  `,
    [user.firstname, user.lastname, user.username, user.password]
  );
};

// GET: Is the user a member or not
exports.getIsMember = async (userId) => {
  const { rows } = await db.query(
    `
    SELECT * FROM users WHERE user_id = $1   
  `,
    [userId]
  );
  return rows;
};

// POST: Update membership status to true
exports.updateMembership = async (userId, status) => {
  await db.query(
    `
    UPDATE users
    SET is_member = $2
    WHERE user_id = $1  
  `,
    [userId, status]
  );
};

// POST: Post the user message post
exports.uploadPost = async (content, userId) => {
  await db.query(
    `
    INSERT INTO post (user_id, title, content)
    VALUES ($1, $2, $3)
  `,
    [userId, content.title, content.content]
  );
};

// GET: Get all user posts
exports.getUserposts = async () => {
  const { rows } = await db.query(`
    SELECT * FROM users INNER JOIN post ON users.user_id = post.user_id ORDER BY post.date_added DESC
  `);
  return rows;
};

// POST: Update admin status of user
exports.postBecomeAdmin = async (userId) => {
  await db.query(
    `
    UPDATE users
    SET is_admin = true
    WHERE user_id = $1  
  `,
    [userId]
  );
};
