const express = require("express");
const router = express.Router();
const { boardController: controller } = require("../src/board.controller");

//  list
router.get("/", (req, res, next) => controller.getBoard(req, res, next));

router.get("/write", (req, res, next) => controller.getWrite(req, res, next));

router.post("/write", (req, res, next) => controller.postWrite(req, res, next));

// view
router.get("/:boardidx", (req, res, next) => controller.getView(req, res, next));

router.get("/modify/:boardidx", (req, res, next) => controller.getModify(req, res, next));

router.put("/modify/:boardidx", (req, res, next) => controller.putBoard(req, res, next));

module.exports = router;
