const db = require("../db/query");

exports.isAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.send("Not authorized");
    // throw new Error("You are not authorized to view this page.");
  }
};

exports.isNotMember = async (req, res, next) => {
  const user = await db.getIsMember(req.user.user_id);
  if (user[0].is_member) {
    // TODO: Replace it by redirecting directly to
    // Home page of authorized users (posts feed)
    return res.send("You are already a member");
  } else {
    next(); // Redirect to membership page
  }
};
