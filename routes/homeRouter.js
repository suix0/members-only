const { Router } = require("express");
const homeController = require("../controllers/homeController");
const authMiddleware = require("./authMiddleware");

const homeRouter = Router();

homeRouter.get("/", authMiddleware.isAuth, homeController.getHomepage);

homeRouter.post("/post", authMiddleware.isAuth, homeController.postUserpost);
module.exports = homeRouter;
