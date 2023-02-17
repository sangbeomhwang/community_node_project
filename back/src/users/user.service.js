class UserService {
  constructor({ userRepository, jwt, qs, axios, DateFormat }) {
    this.userRepository = userRepository;
    this.jwt = jwt;
    this.crypto = jwt.crypto;
    this.qs = qs;
    this.axios = axios;
    this.DateFormat = DateFormat;
  }

  async signup(userData) {
    try {
      const { userid, password, nickname, ...rest } = userData;
      if (!userid || !password || !nickname) throw "내용이 없습니다";

      const hash = this.crypto.createHmac("sha256", this.jwt.salt).update(password).digest("hex");
      const user = await this.userRepository.addUser({
        userid,
        password: hash,
        nickname,
        ...rest,
      });
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }

  async userCheck(user) {
    try {
      const userCheck = await this.userRepository.findUser(user);
      return userCheck;
    } catch (e) {
      throw new Error(e);
    }
  }

  async me(token) {
    try {
      const { userid } = this.jwt.verifyToken(token, this.jwt.salt);
      const user = await this.userRepository.getUserById(userid);
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }

  async id(token) {
    try {
      const { nickname } = this.jwt.verifyToken(token, this.jwt.salt);
      const user = await this.userRepository.getUserByNick(nickname);
      console.log("serv check : ", user);
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }

  async modifyProfile(userData) {
    try {
      const { password, ...rest } = userData;
      const hash = this.crypto.createHmac("sha256", this.jwt.salt).update(password).digest("hex");

      const user = await this.userRepository.updateProfile({
        password: hash,
        ...rest,
      });
      if (user === 1) {
        const modified = await this.userRepository.getUserById(userData.userid);
        const token = this.jwt.createToken(modified);
        return token;
      } else {
        const error = new Error("수정 실패");
        error.status = 401;
        throw error;
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async getKakaoToken({ code }) {
    try {
      const {
        kakao: { host: HOST, rest_api_key: REST_API_KEY, redirect_uri: REDIRECT_URI, client_secret: CLIENT_SECRET },
      } = require("../../config");

      const host = `${HOST}/oauth/token`;
      const headers = {
        "Content-Type": `application/x-www-form-urlencoded`,
      };
      const body = this.qs.stringify({
        grant_type: "authorization_code",
        client_id: REST_API_KEY,
        redirect_uri: REDIRECT_URI,
        code,
        client_secret: CLIENT_SECRET,
      });

      const { data: token } = await this.axios.post(host, body, headers);
      return token;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getKakaoUserProfile({ kakaoToken }) {
    try {
      const { access_token } = kakaoToken;
      const host = `https://kapi.kakao.com/v2/user/me`;
      const { data } = await this.axios.post(host, null, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Bearer ${access_token}`,
        },
      });

      const user = {
        userid: String(data.id),
        password: this.crypto.createHmac("sha256", this.jwt.salt).update(String(data.id)).digest("hex"),
        nickname: data.properties.nickname,
        image: data.properties.profile_image,
        email: data.kakao_account?.email,
        social: "kakao",
      };

      return user;
    } catch (e) {
      throw new Error(e);
    }
  }

  async signinWithKakao({ code }) {
    try {
      const config = require("../../config");
      const kakaoToken = await this.getKakaoToken({ code });
      const user = await this.getKakaoUserProfile({ kakaoToken });
      const result = await this.userRepository.addOrLoginKakao(user);
      if (!result) {
        await this.userRepository.updateKakao(user);
      }
      const { token } = (await this.axios.post(`http://${config.db.development.host}:${config.port}/auths`, { userid: user.userid, password: user.userid })).data;
      return token;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getDetails({ token, post }) {
    try {
      const { nickname } = this.jwt.verifyToken(token, this.jwt.salt);
      if (!nickname) return { message: "잘못된 형식입니다." };
      const response = await this.userRepository.getDetail({ nickname, post });
      console.log(response);
      response.forEach((data) => {
        data.register = new this.DateFormat(data.register).dateformat();
      });

      return response;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getDetailCounts({ token }) {
    try {
      const { nickname } = this.jwt.verifyToken(token, this.jwt.salt);
      if (!nickname) return { message: "잘못된 형식입니다." };
      const response = await this.userRepository.detailCount({ nickname });
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = UserService;
