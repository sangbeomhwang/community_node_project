class BoardService {
  constructor({ boardRepository, DateFormat }) {
    this.boardRepository = boardRepository;
    this.DateFormat = DateFormat;
  }

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
    level,
  }) {
    try {
      if (mainidx === "null" || mainidx === "undefined") mainidx = undefined;
      if (subidx === "null" || subidx === "undefined") subidx = undefined;
      if (level === "null" || level === "undefined") level = undefined;

      const result = await this.boardRepository.findAndCountAll({
        mainidx,
        subidx,
        page,
        maxBoards,
        target,
        sort,
        level,
      });

      const totalBoards = result.count;

      const data = result.rows;

      // console.log("totalboard check ~~~ : ", totalBoards);

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

  async view({ boardidx }) {
    try {
      const result = await this.boardRepository.findOne({ boardidx });
      const data = this.dataControl(result);
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async write({ title, content, nickname, mainidx, subidx }) {
    try {
      const result = await this.boardRepository.create({
        title,
        content,
        nickname,
        mainidx,
        subidx,
      });
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }

  async modify({ boardidx, title, content, nickname, mainidx, subidx }) {
    try {
      const result = await this.boardRepository.update({
        boardidx,
        title,
        content,
        nickname,
        mainidx,
        subidx,
      });
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteBoard({ boardidx }) {
    try {
      const result = await this.boardRepository.delBoard({ boardidx });
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }

  async search({ keyword }) {
    try {
      const result = await this.boardRepository.findList({ keyword });
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }

  async increHits({ boardidx }) {
    try {
      const result = await this.boardRepository.incrementHit({ boardidx });
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = BoardService;
