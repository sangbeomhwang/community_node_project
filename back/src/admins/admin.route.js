const express = require("express");
const router = express.Router();
const { adminController: controller } = require("./admin.module");

router.get("/userlist", (req, res, next) =>
  controller.getUserList(req, res, next)
);

router.put("/:nickname", (req, res, next) =>
  controller.putUser(req, res, next)
);

router.post("/:boardidx", (req, res, next) =>
  controller.putBoard(req, res, next)
);

// router.delete("/:nickname", (req, res, next) =>
//   controller.deleteUser(req, res, next)
// );

// router.get("/boardlist", (req, res, next) =>
//   controller.getBoardList(req, res, next)
// );

router.get("/boardlist", (req, res, next) =>
  controller.getBoardList(req, res, next)
);

module.exports = router;
