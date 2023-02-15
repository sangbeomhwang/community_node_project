class UserService {
  constructor({ userRepository, jwt }) {
    this.userRepository = userRepository;
    this.jwt = jwt;
    this.crypto = jwt.crypto;
  }

  async signup(userData) {
    try {
      const { userid, password, nickname, ...rest } = userData;
      if (!userid || !password || !nickname) throw "내용이 없습니다";

      console.log("확인용", this.jwt.salt);

      const hash = this.crypto
        .createHmac("sha256", this.jwt.salt)
        .update(password)
        .digest("hex");
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
    // console.log(`serv :`, user)
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
      console.log(user);
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }

  async modifyProfile(userData) {
    try {
      const { password, ...rest } = userData;
      const hash = this.crypto
        .createHmac("sha256", this.jwt.salt)
        .update(password)
        .digest("hex");

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

  // async signinWithKakao(kakaoToken) {
  //   try {
  //     const response = await axios.get("https://kapi.kakao.com/v2/user/me", {
  //       headers: {
  //         Authorization: `Bearer ${kakaoToken}`,
  //       },
  //     });
  //     console.log("response check ~~~~ : ", response);

  //     const email = response.data.kakao_account.email;
  //     const kakaoId = response.data.id;

  //     const user = await this.userRepository.getUserByEmail(email);

  //     if (!user) {
  //       await this.userRepository.addKakao(email, kakaoId);
  //     }

  //     return jwt.sign({ userid: user }, process.env.CLIENT_SECRET);
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }
}

module.exports = UserService;
