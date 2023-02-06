const express = require("express");
const router = express.Router();
const userRouter = require("../src/users/user.route");
const authRouter = require("../src/auths/auth.route");
const boardRouter = require("../src/boards/board.route");

router.use("/users", userRouter);
router.use("/auths", authRouter);
router.use("/boards", boardRouter);

module.exports = router;
