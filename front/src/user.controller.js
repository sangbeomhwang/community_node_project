const config = require("../config");
const KAKAO_HOST = config.kakao.host;
const KAKAO_REST_API_KEY = config.kakao.rest_api_key;
const KAKAO_REDIRECT_URI = config.kakao.redirect_uri;

const axios = require("axios");
const request = axios.create({
  baseURL: "http://127.0.0.1:3000",
  withCredentials: true,
});

class UserController {
  async getTerms(req, res, next) {
    try {
      res.render("user/terms.html");
    } catch (e) {
      next(e);
    }
  }

  async postTerms(req, res, next) {
    try {
      res.redirect("/users/signup");
    } catch (e) {
      next(e);
    }
  }

  async getSignup(req, res, next) {
    try {
      res.render("user/signup.html");
    } catch (e) {
      next(e);
    }
  }

  async postSignup(req, res, next) {
    try {
      console.log("확인용", req.body);
      // POST 127.0.0.1:3000/users

      const response = await request.post("/users", {
        ...req.body,
      });
      console.log(`response`, response);

      const { userid, nickname, password } = response.data;

      res.redirect(`/users/welcome?userid=${userid}&nickname=${nickname}&password=${password}`);
    } catch (e) {
      next(e);
    }
  }

  async getWelcome(req, res, next) {
    try {
      const { nickname } = req.query;
      res.render("user/welcome.html", {
        nickname,
      });
    } catch (e) {
      next(e);
    }
  }

  async getSignin(req, res, next) {
    try {
      res.render("user/signin.html");
    } catch (e) {
      next(e);
    }
  }

  async getProfileModify(req, res, next) {
    try {
      // console.log("profile modify check~~~~ : ", req.user);
      res.render("user/profile.html", { ...req.user });
    } catch (e) {
      next(e);
    }
  }

  async postProfileModify(req, res, next) {
    try {
      // console.log("modify :", req.body)
      const response = await request.put("/users", { ...req.body });
      console.log("response :", response.data.token);
      res.cookie("token", response.data.token);
      res.redirect("/users/profile");
    } catch (e) {
      next(e);
    }
  }

  async getKakaoLogin(req, res, next) {
    try {
      const HOST = KAKAO_HOST;
      const REST_API_KEY = KAKAO_REST_API_KEY;
      const REDIRECT_URI = KAKAO_REDIRECT_URI;

      const redirectURI = `${HOST}/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
      res.redirect(redirectURI);
    } catch (e) {
      next(e);
    }
  }
}

const userController = new UserController();

module.exports = {
  userController,
};
