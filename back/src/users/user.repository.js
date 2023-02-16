class UserRepository {
  constructor({ Users, Boards, Comments, Likes }) {
    this.User = Users;
    this.Boards = Boards;
    this.Comments = Comments;
    this.Likes = Likes;
  }

  async addUser(payload) {
    console.log(payload);
    try {
      const user = await this.User.create(payload, { raw: true });
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }

  async findUser(user) {
    const key = Object.keys(user);
    // console.log(user[key]);
    try {
      const userCheck = await this.User.findOne({
        raw: true,
        where: {
          [key]: user[key],
        },
      });
      return userCheck;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getUserById(userid) {
    // console.log(`repo:`, userid);
    try {
      const user = await this.User.findOne({
        raw: true,
        where: {
          userid,
        },
      });
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateProfile(userData) {
    const config = require("../../config");
    const user = await this.User.update(
      {
        image: `http://${config.server.host}:${config.server.port}/user/` + userData.image,
        name: userData.name,
        nickname: userData.nickname,
        password: userData.password,
        phonenumber: userData.phonenumber,
        email: userData.email,
        gender: userData.gender,
        address: userData.address,
        sub_address: userData.sub_address,
        introduce: userData.introduce,
      },
      {
        where: { userid: userData.userid },
        returning: true,
      }
    );
    console.log(`user check : `, user);
    console.log(`repo2 : `, user[1]);
    return user[1];
  }

  async addOrLoginKakao({ userid, password, nickname, image, email, social }) {
    try {
      const [result, exist] = await this.User.findOrCreate({ where: { userid }, defaults: { userid, password, nickname, image, email, social }, raw: true });
      return exist;
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateKakao({ userid, nickname, image, email }) {
    try {
      const result = await this.User.update({ nickname, image, email }, { where: { userid } });
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getUserByEmail(email) {
    // console.log(`repo:`, email);
    try {
      const user = await this.User.findOne({
        raw: true,
        where: {
          email,
        },
      });
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getDetail({ nickname, post }) {
    try {
      const response = await this.Boards.findAndCountAll({
        include: [{ model: this.Users, where: { nickname: "cloud" } }],
      });
      console.log(response);
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = UserRepository;
