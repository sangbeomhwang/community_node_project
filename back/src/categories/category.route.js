const express = require("express");
const router = express.Router();
const { categoryController: controller } = require("./category.module");

router.get("/", (req, res, next) => controller.getCategory(req, res, next));

// router.get("/sub", (req, res, next) => controller.getSubCategory(req, res, next));

module.exports = router;
