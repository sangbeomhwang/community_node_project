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

  async boardUpdate({ boardidx, visible }) {
    try {
      const boardPut = await this.Board.update(
        { boardidx, visible },
        { where: { boardidx } }
      );
      return boardPut;
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

  async findAndCountAll({ mainidx, subidx, page, maxBoards, target, sort }) {
    try {
      if (!mainidx) {
        const boardList = await this.Boards.findAndCountAll({
          limit: maxBoards,
          offset: (page - 1) * maxBoards,
          order: [[target, sort]],
          raw: true,
        });
        return boardList;
      }
      if (!subidx) {
        const boardList = await this.Boards.findAndCountAll({
          limit: maxBoards,
          offset: (page - 1) * maxBoards,
          order: [[target, sort]],
          where: {
            mainidx,
          },
          raw: true,
        });
        return boardList;
      }
      const boardList = await this.Boards.findAndCountAll({
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
}

module.exports = AdminRepository;
