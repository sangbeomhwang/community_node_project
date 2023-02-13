const express = require("express");
const router = express.Router();
const { hashController: controller } = require("./hash.module");

// router.get("/", (req, res, next) => controller.getHashes(req, res, next));
router.post("/", (req, res, next) => controller.postHashes(req, res, next));

module.exports = router;
