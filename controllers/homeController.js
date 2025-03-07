const db = require("../db/query");

exports.getHomepage = (req, res) => {
  res.render("home/home", { user: req.user });
};
