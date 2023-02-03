const express = require("express");
const router = express.Router();
const userRouter = require("./user.route");
const boardRouter = require("./board.route");

router.use("/users", userRouter);
router.use("/boards", boardRouter);

module.exports = router;
