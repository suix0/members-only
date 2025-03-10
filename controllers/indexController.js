const asyncHandler = require("express-async-handler");
const db = require("../db/query");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

// Custom validator to check if username already exists in our database

const validateUser = [
  body("firstname").trim().notEmpty().withMessage("First name can't be empty."),
  body("lastname").trim().notEmpty().withMessage("Last name can't be empty."),
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username can't be empty.")
    .custom(async (value) => {
      const existingUser = await db.getUsername(value);
      if (existingUser) {
        throw new Error("This user already exists.");
      }
    }),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password can't be empty.")
    .isLength({ min: 8 })
    .withMessage("Password must have a minimum of 8 characters"),
  body("confirmPassword")
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage("Your passwords did not match. Please try again."),
];

exports.getLandingPage = (req, res) => {
  if (req.user) {
    return res.redirect("/home");
  }

  res.render("landingPage", {
    isLanding: true,
    message: req.session.messages ? req.session.messages[0] : "",
  });
};

exports.getRegisterForm = (req, res) => {
  res.render("register");
};

exports.getLoginPage = (req, res) => {
  res.render("login");
};

exports.postRegisterForm = [
  validateUser,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("register", { errors: errors.array() });
    }
    req.body.password = await bcrypt.hash(req.body.password, 10);
    await db.postNewUser(req.body);

    res.redirect("/login");
  },
];

exports.getBecomeMember = (req, res) => {
  res.render("becomeMember");
};

exports.postMembership = async (req, res) => {
  if (req.body.year === "2013") {
    // Update user membership to true
    await db.updateMembership(req.user.user_id, true);
    res.redirect("/home");
  } else {
    res.render("becomeMember", {
      errMessage: "That's not quite right. Try again!",
    });
  }
};

exports.getLogout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
