const asyncHandler = require("express-async-handler");
const db = require("../db/query");
const { body, validationResult } = require("express-validator");

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
  res.render("landingPage");
};

exports.getRegisterForm = (req, res) => {
  res.render("register");
};

exports.postRegisterForm = [
  validateUser,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("register", { error: errors.array() });
    }
    res.send(req.body);
  },
];
