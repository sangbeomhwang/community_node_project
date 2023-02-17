const express = require("express");
const router = express.Router();
const { userController: controller } = require("../src/user.controller");

router.get("/terms", (req, res, next) => controller.getTerms(req, res, next));

router.post("/terms", (req, res, next) => controller.postTerms(req, res, next));

router.get("/signup", (req, res, next) => controller.getSignup(req, res, next));

router.post("/signup", (req, res, next) =>
  controller.postSignup(req, res, next)
);

router.get("/welcome", (req, res, next) =>
  controller.getWelcome(req, res, next)
);

router.get("/signin", (req, res, next) => controller.getSignin(req, res, next));

router.get("/profile", (req, res, next) =>
  controller.getProfileModify(req, res, next)
);

router.post("/profile", (req, res, next) =>
  controller.postProfileModify(req, res, next)
);

router.get("/kakao/login", (req, res, next) =>
  controller.getKakaoLogin(req, res, next)
);

router.get("/kakao/cookie", (req, res, next) => {
  controller.kakaoCookie(req, res, next);
});

router.get("/mypage", (req, res, next) => controller.getmypage(req, res, next));

module.exports = router;
