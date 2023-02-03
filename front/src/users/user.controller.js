// const axios = require("axios");
// const request = axios.create({
//   baseURL: "http://127.0.0.1:3000",
//   withCredentials: true,
// });

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
      console.log(req.body);
      // POST 127.0.0.1:3000/users

      const response = await request.post("/users", {
        ...req.body,
      });
      console.log(`response`, response);

      const { userid, username } = response.data;

      res.redirect(`/users/welcome?userid=${userid}&username=${username}`);
    } catch (e) {
      next(e);
    }
  }

  async getWelcome(req, res, next) {
    try {
      const { userid, username } = req.query;
      res.render("user/welcome.html", {
        userid,
        username,
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

  async getProfile(req, res, next) {
    try {
      res.render("user/profile.html", { ...req.user });
    } catch (e) {
      next(e);
    }
  }

  async getProfileModify(req, res, next) {
    try {
      res.render("user/profile.html", { ...req.user });
    } catch (e) {
      next(e);
    }
  }

  async postProfileModify(req, res, next) {
    try {
      console.log(`front modify`, req.body);
      await request.put("/users", { ...req.body });

      res.redirect("/");
    } catch (e) {
      next(e);
    }
  }

  async getKakaoLogin(req, res, next) {
    try {
      const HOST = "https://kauth.kakao.com";
      const REST_API_KEY = "생략";
      const REDIRECT_URI = "http://localhost:3000/oauth/kakao";
      const CLIENT_SECRET = "생략";

      // kauth.kakao.com
      // /oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code
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
