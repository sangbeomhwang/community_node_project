class BoardService {
  constructor({ boardRepository, DateFormat }) {
    this.boardRepository = boardRepository;
    this.DateFormat = DateFormat;
  }

  dateFormatting(data) {
    const { register, ...rest } = data;
    const date = new this.DateFormat(register).dateformat();
    return { ...rest, register: date };
  }

  async list({ mainidx, subidx, page = 1, maxBoards }) {
    try {
      if (subidx === "null") subidx = undefined;
      const result = await this.boardRepository.findAll({ mainidx, subidx });
      // console.log(result)
      const totalBoards = result.length;
      const startNum = (page - 1) * maxBoards;
      const endNum = page * maxBoards - 1;
      let data = [];
      if (startNum < totalBoards) {
        for (let i = startNum; i <= endNum; i++) {
          if (result[i]) {
            data.push(this.dateFormatting(result[i]));
          }
        }
      }
      const lastPage = Math.floor(totalBoards / maxBoards) + (totalBoards % maxBoards === 0 ? 0 : 1);
      const viewPageCount = 5;
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
      // console.log(pagination);
      return { data, pagination };
    } catch (e) {
      throw new Error(e);
    }
  }

  async view({ boardidx }) {
    try {
      const result = await this.boardRepository.findOne({ boardidx });
      const data = this.dateFormatting(result);
      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  async write({ title, content, nickname, mainidx, subidx }) {
    try {
      const result = await this.boardRepository.create({ title, content, nickname, mainidx, subidx });
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }

  async modify({ boardidx, title, content, nickname, mainidx, subidx }) {
    try {
      const result = await this.boardRepository.update({ boardidx, title, content, nickname, mainidx, subidx });
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }

  async deleteBoard({ boardidx }) {
    try {
      const result = await this.boardRepository.delBoard({ boardidx });
    } catch (e) {
      throw new Error(e);
    }
  }

  async search({ keyword }) {
    try {
      const result = await this.boardRepository.findList({ keyword})
      return result
    } catch (e) {
      throw new Error(e)
    }
  }
}

module.exports = BoardService;
