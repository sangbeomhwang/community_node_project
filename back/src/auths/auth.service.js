class AuthService {
  constructor({ authRepository, jwt }) {
    this.authRepository = authRepository;
    this.jwt = jwt;
    this.crypto = jwt.crypto;
    // this.exceptionHandling = config.exception.BadRequest;
  }

  async token({ userid, password }) {
    try {
      if (!userid || !password) throw "사용자가 없습니다";
      const hash = this.crypto
        .createHmac("sha256", this.jwt.salt)
        .update(password)
        .digest("hex");
      const user = await this.authRepository.getUserByInfo({
        userid,
        password: hash,
      });
      if (!user) throw "아이디와 패스워드가 일치하지 않습니다";

      const token = this.jwt.createToken(user);
      return token;
    } catch (e) {
      throw new Error(e);
      // throw new this.BadRequest(e);
    }
  }
}

module.exports = AuthService;
