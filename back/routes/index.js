const express = require("express");
const router = express.Router();
const userRouter = require("../src/users/user.route");
const authRouter = require("../src/auths/auth.route");
const boardRouter = require("../src/boards/board.route");
const categoryRouter = require("../src/categories/category.route");
const commentRouter = require('../src/comments/comment.route')

router.use("/users", userRouter);
router.use("/auths", authRouter);
router.use("/boards", boardRouter);
router.use("/categories", categoryRouter);
router.use('/comments', commentRouter);

module.exports = router;
