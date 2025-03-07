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
  authMiddleware.isAuth,
  authMiddleware.isNotMember,
  indexController.getBecomeMember
);

indexRouter.post("/register", indexController.postRegisterForm);
indexRouter.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/becomeMember",
    failureRedirect: "/",
    failureMessage: true,
  })
);
// indexRouter.post("/becomeMember", indexController.postMembership);

module.exports = indexRouter;
