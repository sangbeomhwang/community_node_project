class BoardService {
  constructor({ boardRepository }) {
    this.boardRepository = boardRepository;
  }

  async list({ mainidx, subidx }) {
    try {
      const result = await this.boardRepository.findAll({ mainidx, subidx });
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }

  async view({ boardidx }) {
    try {
      const result = await this.boardRepository.findOne({ boardidx });
      return result;
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
