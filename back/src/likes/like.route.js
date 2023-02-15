const express = require("express");
const router = express.Router();
const { likeController: controller } = require("./like.module");

router.get("/", (req, res, next) => controller.getLikes(req, res, next));
router.put("/", (req, res, next) => controller.putLikes(req, res, next));

module.exports = router;
