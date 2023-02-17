class AdminService {
  constructor({ adminRepository, DateFormat }) {
    this.adminRepository = adminRepository;
    this.DateFormat = DateFormat;
  }

  async userList() {
    try {
      const response = await this.adminRepository.list();
      const userCount = response.length;
      // console.log("#################", response);
      // console.log("###~~~~~~", userCount);
      return { response, userCount };
    } catch (e) {
      throw new Error(e);
    }
  }

  async userModify({ nickname, name, email, level, access }) {
    try {
      const result = await this.adminRepository.userUpdate({
        nickname,
        name,
        email,
        level,
        access,
      });
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }

  async boardModify({ boardidx, visible }) {
    try {
      const result = await this.adminRepository.boardUpdate({
        boardidx,
        visible,
      });
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }

  // async userDelete({ nickname }) {
  //   try {
  //     const response = await this.adminRepository.userDestroy({ nickname });
  //     console.log("#################", response);
  //     return response;
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  // async boardsList() {
  //   try {
  //     const response = await this.adminRepository.boardList();
  //     const boardCount = response.length;
  //     // console.log("1check response : ", response);
  //     // console.log("###~~~~~~", boardCount);

  //     response.forEach((board) => {
  //       board.register = new this.DateFormat(board.register).dateformat();
  //     });

  //     console.log("1check response : ", response);

  //     return { response, boardCount };
  //   } catch (e) {
  //     throw new Error(e);
  //   }
  // }
}

module.exports = AdminService;
