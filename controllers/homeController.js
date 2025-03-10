const db = require("../db/query");
const { body, validationResult } = require("express-validator");

const validatePost = [
  body("title").trim().notEmpty().withMessage("Title can't be empty."),
  body("content").trim().notEmpty().withMessage("Message can't be empty."),
];

exports.getHomepage = async (req, res) => {
  const userPosts = await db.getUserposts();
  const users = await db.getUsers();
  res.render("home/home", {
    user: req.user,
    userPosts: userPosts && userPosts.length > 0 ? userPosts : null,
    isMember: req.user.is_member,
    isAdmin: req.user.is_admin,
    users: users,
  });
};

exports.postUserpost = [
  validatePost,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("home/home", {
        user: req.user,
        errors: errors.array(),
        openDialog: true, // Open dialog upon rerendering page
      });
    }
    await db.uploadPost(req.body, req.user.user_id);
    res.redirect("/home");
  },
];

exports.postBecomeAdmin = async (req, res) => {
  await db.postBecomeAdmin(req.user.user_id);
  res.redirect("/home");
};

exports.getDeletePost = async (req, res) => {
  const postId = Number(req.params.postId);
  await db.deletePost(postId);
  res.redirect("/home");
};
