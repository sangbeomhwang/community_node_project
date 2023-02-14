const express = require("express");
const router = express.Router();
const { hashController: controller } = require("./hash.module");

router.post("/", (req, res, next) => controller.postHashes(req, res, next));
router.put("/", (req, res, next) => controller.putHashes(req, res, next));

module.exports = router;
