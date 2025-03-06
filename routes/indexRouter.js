const { Router } = require("express");
const indexController = require("../controllers/indexController");

const indexRouter = Router();

indexRouter.get("/", indexController.getLandingPage);
indexRouter.get("/register", indexController.getRegisterForm);

indexRouter.post("/register", indexController.postRegisterForm);
module.exports = indexRouter;
