class AdminRepository {
  constructor({ Users }) {
    this.User = Users;
  }

  async list() {
    try {
      const userList = await this.User.findAll({
        raw: true,
      });
      console.log("check #### : ", userList);
      return userList;
    } catch (e) {
      throw new Error(e);
    }
  }

  async userDestroy({ nickname }) {
    try {
      const user_remove = await this.User.destroy({
        where: { nickname },
      });
      console.log("check #### : ", user_remove);
      return user_remove;
    } catch (e) {
      next(e);
    }
  }
}

module.exports = AdminRepository;