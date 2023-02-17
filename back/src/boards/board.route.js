const express = require("express");
const router = express.Router();
const { boardController: controller } = require("./board.module");
const uploads = require("../../middlewares/uploads");

router.get("/", (req, res, next) => controller.getList(req, res, next));
router.post("/", (req, res, next) => controller.postOne(req, res, next));
router.get("/search", (req, res, next) => controller.getSearch(req, res, next));
router.get("/hits", (req, res, next) => controller.incrementHits(req, res, next));
router.post("/img", uploads("board").single("file"), (req, res, next) => {
  res.json(req.file);
});

router.get("/:boardidx", (req, res, next) => controller.getOne(req, res, next));
router.put("/:boardidx", (req, res, next) => controller.putOne(req, res, next));
router.delete("/:boardidx", (req, res, next) => controller.deleteOne(req, res, next));

module.exports = router;
