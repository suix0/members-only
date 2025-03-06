const db = require("./pool");

// GET: Find a specific username if it exists
exports.getUsername = async (username) => {
  const { rows } = await db.query("SELECT * FROM users WHERE user_name = $1", [
    username,
  ]);
  return rows[0];
};
