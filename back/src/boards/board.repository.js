class BoardRepository {
  constructor({ Boards }) {
    this.board = Boards;
  }

  async findAll({ mainidx, subidx }) {
    try {
      if (!subidx) {
        const boardList = await this.board.findAll({
          where: {
            mainidx,
          },
          raw: true,
        });
        return boardList;
      }
      const boardList = await this.board.findAll({ where: { mainidx, subidx }, raw: true });
      return boardList;
    } catch (e) {
      throw new Error(e);
    }
  }

  async findOne({ boardidx }) {
    try {
      const boardOne = await this.board.findOne({ where: { boardidx }, raw: true });
      return boardOne;
    } catch (e) {
      throw new Error(e);
    }
  }

  async create({ title, content, nickname, mainidx, subidx }) {
    try {
      const boardPost = await this.board.create({ title, content, nickname, mainidx, subidx });
      return boardPost;
    } catch (e) {
      throw new Error(e);
    }
  }

  async update({ boardidx, title, content, nickname, mainidx, subidx }) {
    try {
      const boardPut = await this.board.update({ title, content, nickname, mainidx, subidx }, { where: { boardidx } });
      return boardPut;
    } catch (e) {
      throw new Error(e);
    }
  }

  async delBoard({ boardidx }) {
    try {
      const delBoard = await this.board.destroy({ where: { boardidx } });
      return delBoard;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = BoardRepository;
