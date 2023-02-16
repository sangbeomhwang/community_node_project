const express = require("express");
const router = express.Router();
const { userController: controller } = require("./user.module");
const uploads = require("../../middlewares/uploads");

router.post("/", (req, res, next) => controller.postSignup(req, res, next));
router.post("/usercheck", (req, res, next) =>
  controller.postUserCheck(req, res, next)
);
router.get("/me", (req, res, next) => controller.getMe(req, res, next));
router.put("/", (req, res, next) => controller.putProfile(req, res, next));

router.post("/single", uploads("user").single("filename"), (req, res, next) => {
  console.log("req.file : ", req.file);
  res.send(req.file);
});

router.get("/oauth/kakao", (req, res, next) =>
  controller.kakaoSignin(req, res, next)
);

/*
router.get("/oauth/kakao", async (req, res, next) => {
  // (step 2) token 받기: 인가 코드를 가지고 "access_token"을 받아오는 부분
  // console.log(req.query);
  const { code } = req.query;

  const host = `${KAKAO_HOST}/oauth/token`;
  const headers = {
    "Content-Type": `application/x-www-form-urlencoded`,
  };
  const body = qs.stringify({
    grant_type: "authorization_code",
    client_id: KAKAO_REST_API_KEY,
    redirect_uri: KAKAO_REDIRECT_URI,
    code,
    client_secret: KAKAO_CLIENT_SECRET,
  });

  const response = await axios.post(host, body, headers);
  console.log("response check ~~~~ : ", response.data); // 여기서는 token만 받아옴!!

  // token을 가지고 회원정보를 조회해야 함!

  // (step 3) 회원정보 가져오기
  try {
    const { access_token } = response.data;
    const host = `https://kapi.kakao.com/v2/user/me`;
    // body 정보는 필요없기에 "null"로 처리함!
    const user = await axios.post(host, null, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Bearer ${access_token}`,
      },
    });

    // console.log("user info ~~~ : ", user);



    // 우리 DB에 저장하는 것이 가장 좋다!
    // user 정보를 우리 DB에 저장해놓고

    // 형태가 다를 수 있어 우리 형태의 토큰으로 재발급함
  } catch (e) {
    next(e);
  }

  // front server에 redirect를 요청함
  res.redirect("http://localhost:3005");
});
*/

module.exports = router;
