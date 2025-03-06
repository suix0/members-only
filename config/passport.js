const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const db = require("../db/pool");

// Define the function that handles auth
const authenticateUser = async (username, password, done) => {
  try {
    const { rows } = await db.query(
      "SELECT * FROM users WHERE user_name = $1",
      [username]
    );
    const user = rows[0];

    if (!user) {
      return done(null, false, { message: "Username incorrect." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (isPasswordValid) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Password incorrect." });
    }
  } catch (err) {
    done(err);
  }
};

const strategy = new LocalStrategy(authenticateUser);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const { rows } = await db.query("SELECT * FROM users WHERE user_id = $1", [
      userId,
    ]);
    const user = rows[0];

    done(null, user);
  } catch (err) {
    done(err);
  }
});
