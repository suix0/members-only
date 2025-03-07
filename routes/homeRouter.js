const { Router } = require("express");
const homeController = require("../controllers/homeController");
const authMiddleware = require("./authMiddleware");

const homeRouter = Router();

homeRouter.get("/", authMiddleware.isAuth, homeController.getHomepage);

module.exports = homeRouter;
