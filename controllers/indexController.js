const asyncHandler = require("express-async-handler");

exports.getLandingPage = (req, res) => {
  res.render("landingPage");
};

exports.getRegisterForm = (req, res) => {
  res.render("register");
};
