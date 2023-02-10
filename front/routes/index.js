const express = require("express");
const router = express.Router();
const userRouter = require("./user.route");
const boardRouter = require("./board.route");
const adminRouter = require("./admin.route");

router.use("/users", userRouter);
router.use("/boards", boardRouter);
router.use("/admins", adminRouter);

module.exports = router;
