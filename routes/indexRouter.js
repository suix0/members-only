const { Router } = require("express");
const indexController = require("../controllers/indexController");
const passport = require("passport");

const indexRouter = Router();

indexRouter.get("/", indexController.getLandingPage);
indexRouter.get("/register", indexController.getRegisterForm);

indexRouter.post("/register", indexController.postRegisterForm);
indexRouter.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureMessage: true,
  })
);

module.exports = indexRouter;
