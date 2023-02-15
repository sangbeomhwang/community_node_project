const qs = require("qs");
const axios = require("axios");

const config = require("../../config");
const KAKAO_HOST = config.kakao.host;
const KAKAO_REST_API_KEY = config.kakao.rest_api_key;
const KAKAO_REDIRECT_URI = config.kakao.redirect_uri;
const KAKAO_CLIENT_SECRET = config.kakao.client_secret;

class UserController {
  constructor({ userService }) {
    this.userService = userService;
  }
  async postSignup(req, res, next) {
    try {
      const user = await this.userService.signup(req.body);
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }

  async postUserCheck(req, res, next) {
    // console.log(`con :`, req.body);
    try {
      // const { userid } = req.body;
      const user = await this.userService.userCheck(req.body);
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }

  async getMe(req, res, next) {
    try {
      if (!req.headers.authorization) throw new Error("No Authorization");
      const [type, token] = req.headers.authorization.split(" ");
      if (type.toLowerCase() !== "bearer")
        throw new Error("Authorization Type Error");
      const user = await this.userService.me(token);
      res.json(user);
    } catch (e) {
      next(e);
    }
  }

  async putProfile(req, res, next) {
    try {
      const token = await this.userService.modifyProfile(req.body);
      // console.log("check 용", req.body);
      // console.log("check 용", token);
      // res.cookie('token', token)
      res.json({ token });
    } catch (e) {
      next(e);
    }
  }

  async kakaoSignin(req, res, next) {
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

    // 회원정보 가져오기
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

      console.log("token info ~~~ : ", access_token);
      console.log("user info ~~~ : ", user.data);

      // front server에 redirect를 요청함
      res.redirect("http://localhost:3005");
    } catch (e) {
      next(e);
    }
  }

  // async kakaoSignin(req, res, next) {
  //   try {
  //     const kakaoToken = req.headers.authorization;
  //     const accessToken = await this.userService.signinWithKakao(kakaoToken);

  //     return res.status(200).json({ accessToken });
  //   } catch (e) {
  //     next(e);
  //   }
  // }
}

module.exports = UserController;
