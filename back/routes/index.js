const express = require("express");
const router = express.Router();
const userRouter = require("../src/users/user.route");
const authRouter = require("../src/auths/auth.route");
const boardRouter = require("../src/boards/board.route");
const categoryRouter = require("../src/categories/category.route");
const commentRouter = require("../src/comments/comment.route");
const hashRouter = require("../src/hashes/hash.route");
const adminRouter = require("../src/admins/admin.route");
const likeRouter = require("../src/likes/like.route");

router.use("/users", userRouter);
router.use("/auths", authRouter);
router.use("/boards", boardRouter);
router.use("/categories", categoryRouter);
router.use("/comments", commentRouter);
router.use("/hashes", hashRouter);
router.use("/admins", adminRouter);
router.use("/likes", likeRouter);

module.exports = router;
