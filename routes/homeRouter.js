const { Router } = require("express");
const homeController = require("../controllers/homeController");
const authMiddleware = require("./authMiddleware");

const homeRouter = Router();

homeRouter.get("/", authMiddleware.isAuth, homeController.getHomepage);

homeRouter.post("/post", authMiddleware.isAuth, homeController.postUserpost);

homeRouter.post(
  "/becomeAdmin",
  authMiddleware.isAuth,
  homeController.postBecomeAdmin
);

homeRouter.get(
  "/delete/:postId",
  authMiddleware.isAuth,
  authMiddleware.isAdmin,
  homeController.getDeletePost
);

module.exports = homeRouter;
