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
