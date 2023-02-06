class UserService {
  constructor({ userRepository, jwt }) {
    this.userRepository = userRepository;
    this.jwt = jwt;
    this.crypto = jwt.crypto;
  }

  async signup(userData) {
    try {
      const {
        userid,
        name,
        password,
        nickname,
        email,
        address,
        sub_address,
        social,
        ...rest
      } = userData;
      if (
        !userid ||
        !password ||
        !name ||
        !nickname ||
        !email ||
        !address ||
        !sub_address ||
        !social
      )
        throw "내용이 없습니다";

      console.log("확인용", this.jwt.salt);

      const hash = this.crypto
        .createHmac("sha256", this.jwt.salt)
        .update(password)
        .digest("hex");
      const user = await this.userRepository.addUser({
        userid,
        name,
        password: hash,
        nickname,
        email,
        address,
        sub_address,
        social,
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

  async putProfile(userData) {
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
}

module.exports = UserService;
