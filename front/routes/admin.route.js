const express = require("express");
const router = express.Router();
const { adminController: controller } = require("../src/admin.controller");

router.get("/", (req, res, next) => controller.getIndex(req, res, next));
router.get("/users", (req, res, next) => controller.getUsers(req, res, next));
router.get("/boards", (req, res, next) => controller.getBoards(req, res, next));
router.get("/comments", (req, res, next) =>
  controller.getComments(req, res, next)
);

module.exports = router;
