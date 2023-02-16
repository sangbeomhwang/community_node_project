const express = require("express");
const router = express.Router();
const { userController: controller } = require("./user.module");
const uploads = require("../../middlewares/uploads");

router.post("/", (req, res, next) => controller.postSignup(req, res, next));
router.post("/usercheck", (req, res, next) => controller.postUserCheck(req, res, next));
router.get("/me", (req, res, next) => controller.getMe(req, res, next));
router.get("/details", (req, res, next) => controller.getDetail(req, res, next));
router.put("/", (req, res, next) => controller.putProfile(req, res, next));

router.post("/single", uploads("user").single("filename"), (req, res, next) => {
  console.log("req.file : ", req.file);
  res.send(req.file);
});

router.get("/oauth/kakao", (req, res, next) => controller.kakaoSignin(req, res, next));

module.exports = router;
