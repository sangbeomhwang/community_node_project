class UserRepository {
  constructor({ Users, Boards, Comments, Likes, Points, sequelize }) {
    this.User = Users;
    this.Boards = Boards;
    this.Comments = Comments;
    this.Likes = Likes;
    this.Points = Points;
    this.sequelize = sequelize;
  }

  async addUser(payload) {
    try {
      const user = await this.User.create(payload, { raw: true });
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }

  async findUser(user) {
    const key = Object.keys(user);
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
      console.log("repo : ", user);
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getUserByNick(nickname) {
    try {
      const user = await this.User.findOne({
        raw: true,
        attributes: { exclude: ["password"] },
        where: {
          nickname,
        },
      });
      console.log("repo : ", user);
      return user;
    } catch (e) {
      throw new Error(e);
    }
  }

  async updateProfile(userData) {
    const config = require("../../config");
    const user = await this.User.update(
      {
        image: `http://${config.server.my}:${config.server.myPort}/user/` + userData.image,
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
    return user[1];
  }

  async addOrLoginKakao({ userid, password, nickname, image, email, social }) {
    try {
      const [result, exist] = await this.User.findOrCreate({
        where: { userid },
        defaults: { userid, password, nickname, image, email, social },
        raw: true,
      });
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
      switch (post) {
        case "boards": {
          const response = await this.Boards.findAll({
            where: { nickname },
            raw: true,
          });
          return response;
        }

        case "comments": {
          const response = await this.Comments.findAll({
            where: { nickname },
            raw: true,
          });
          return response;
        }

        case "likes": {
          const response = await this.sequelize.query(
            `select A.boardidx, A.title, A.register, A.mainidx, A.subidx, B.nickname from Boards as A right join Likes as B on A.boardidx = B.boardidx where B.nickname='${nickname}'`,
            {
              type: this.sequelize.QueryTypes.SELECT,
            }
          );
          return response;
        }

        default:
          return { message: "지원되지 않는 형식입니다." };
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  async detailCount({ nickname }) {
    try {
      const boards = await this.Boards.count({
        where: { nickname },
      });
      const comments = await this.Comments.count({
        where: { nickname },
      });
      const likes = await this.Likes.count({
        where: { nickname },
      });
      const [commnetsPoint] = await this.sequelize.query(
        `SELECT COUNT(*) FROM (
        SELECT A.title, B.commentidx, B.nickname 
        FROM Boards AS A 
        RIGHT JOIN Comments AS B ON A.boardidx = B.boardidx 
        WHERE A.nickname = '${nickname}' AND B.nickname != '${nickname}'
    ) AS result`,
        {
          type: this.sequelize.QueryTypes.SELECT,
        }
      );
      return { boards, comments, likes, commnetsPoint };
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = UserRepository;
