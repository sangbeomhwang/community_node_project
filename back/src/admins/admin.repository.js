class AdminRepository {
  constructor({ Users, Boards }) {
    this.User = Users;
    this.Board = Boards;
  }

  async list() {
    try {
      const userList = await this.User.findAll({
        raw: true,
      });
      // console.log("check #### : ", userList);
      return userList;
    } catch (e) {
      throw new Error(e);
    }
  }

  async userUpdate({ nickname, name, email, level, access }) {
    try {
      const userPut = await this.User.update(
        { nickname, name, email, level, access },
        { where: { nickname } }
      );
      return userPut;
    } catch (e) {
      throw new Error(e);
    }
  }

  // async userDestroy({ nickname }) {
  //   try {
  //     const user_remove = await this.User.destroy({
  //       where: { nickname },
  //     });
  //     console.log("check #### : ", user_remove);
  //     return user_remove;
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  // async boardList() {
  //   try {
  //     const boardList = await this.Board.findAll({
  //       raw: true,
  //     });
  //     // console.log("check #### : ", boardList);
  //     return boardList;
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }

  async boardFindAndCountAll({
    mainidx,
    subidx,
    page,
    maxBoards,
    target,
    sort,
  }) {
    try {
      if (!subidx) {
        const boardList = await this.Board.findAndCountAll({
          limit: maxBoards,
          offset: (page - 1) * maxBoards,
          order: [[target, sort]],
          where: {
            mainidx,
          },
          raw: true,
        });
        console.log(boardList);
        return boardList;
      }
      const boardList = await this.Board.findAndCountAll({
        limit: maxBoards,
        offset: (page - 1) * maxBoards,
        order: [[target, sort]],
        where: { mainidx, subidx },
        raw: true,
      });
      return boardList;
    } catch (e) {
      throw new Error(e);
    }
  }

  async boardList({ keyword }) {
    try {
      const response = await this.Boards.findAll({
        where: {
          [this.Op.or]: [
            { title: { [this.Op.like]: `%${keyword}%` } },
            { nickname: { [this.Op.like]: `%${keyword}%` } },
          ],
        },
        raw: true,
      });

      return response;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = AdminRepository;
