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

  async extData({ boardidx, nickname }) {
    const comment = await this.boardRepository.findCommentsCount({ boardidx });
    const like = await this.boardRepository.findLikesCount({ boardidx });
    const { image } = await this.boardRepository.findImage({ nickname });
    const hashtag = await this.boardRepository.findHashtags({ boardidx });

    const hash = hashtag.map((val) => val.tag);

    return { comment, like, image, hash };
  }

  async dataControl(data) {
    const { register, ...rest } = data;
    const { comment, like, image, hash } = await this.extData({
      boardidx: data.boardidx,
      nickname: data.nickname,
    });
    const date = new this.DateFormat(register).dateformat();
    return { ...rest, register: date, comment, like, image, hash };
  }

  async list({
    mainidx,
    subidx,
    page,
    maxBoards,
    target,
    sort,
    viewPageCount,
  }) {
    try {
      if (mainidx === "null" || mainidx === "undefined") mainidx = undefined;
      if (subidx === "null" || subidx === "undefined") subidx = undefined;

      const result = await this.adminRepository.findAndCountAll({
        mainidx,
        subidx,
        page,
        maxBoards,
        target,
        sort,
      });
      const totalBoards = result.count;
      // console.log("totalboard check ~~~ : ", totalBoards);

      const data = result.rows;
      for (let i = 0; i < data.length; i++) {
        data[i] = await this.dataControl(data[i]);
      }

      const lastPage = Math.ceil(totalBoards / maxBoards);
      let startPageNum = 1;
      let start = Math.floor(page / viewPageCount);
      if (start >= 1) {
        if (page % viewPageCount === 0) {
          start--;
        }
        startPageNum = start * viewPageCount + 1;
      }
      let endPageNum = startPageNum - 1 + viewPageCount;
      if (endPageNum > lastPage) endPageNum = lastPage;
      const pagination = {
        totalBoards,
        maxBoards,
        viewPageCount,
        startPageNum,
        endPageNum,
        lastPage,
        page,
      };

      return { data, pagination };
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = AdminService;
