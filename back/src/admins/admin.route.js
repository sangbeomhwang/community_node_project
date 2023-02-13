const express = require("express");
const router = express.Router();
const { adminController: controller } = require("./admin.module");

router.get("/userlist", (req, res, next) =>
  controller.getUserList(req, res, next)
);

router.delete("/:nickname", (req, res, next) =>
  controller.deleteUser(req, res, next)
);

module.exports = router;
