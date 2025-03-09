const { Router } = require("express");
const indexController = require("../controllers/indexController");
const passport = require("passport");
const authMiddleware = require("./authMiddleware");

const indexRouter = Router();

indexRouter.get("/", indexController.getLandingPage);
indexRouter.get("/register", indexController.getRegisterForm);
indexRouter.get("/login", indexController.getLoginPage);
indexRouter.get(
  "/becomeMember",
  authMiddleware.isAuth, // Check if user is authenticated
  authMiddleware.isNotMember, // Check if user is not a member
  indexController.getBecomeMember // Then open the get membership page
);

indexRouter.post("/register", indexController.postRegisterForm);
indexRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/", // Change for separate login page
    failureMessage: true,
  })
);
indexRouter.post("/becomeMember", indexController.postMembership);
indexRouter.get("/logout", indexController.getLogout);

module.exports = indexRouter;
