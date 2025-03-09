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
    res.render("becomeMember", { isMember: true });
  } else {
    next(); // Redirect to membership registration page
  }
};

exports.isAdmin = (req, res, next) => {
  if (req.user.is_admin) {
    next();
  } else {
    res.send("Not authorized");
  }
};
