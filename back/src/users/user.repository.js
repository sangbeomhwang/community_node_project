class UserRepository {
  constructor({ Users }) {
    this.User = Users;
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
    console.log(`repo : `, userData);
    const user = await this.User.update(
      {
        image: userData.image,
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

  // async addKakao({ email, kakaoId }) {
  //   console.log({ email, kakaoId });
  //   try {
  //     const user = await this.User.create({ email, kakaoId }, { raw: true });
  //     return user;
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }

  // async getUserByEmail(email) {
  //   // console.log(`repo:`, email);
  //   try {
  //     const user = await this.User.findOne({
  //       raw: true,
  //       where: {
  //         email,
  //       },
  //     });
  //     return user;
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }
}

module.exports = UserRepository;
