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

  async list({ mainidx, subidx, page, maxBoards }) {
    try {
      const result = await this.boardRepository.findAll({ mainidx, subidx });
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
      return data;
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
}

module.exports = BoardService;
