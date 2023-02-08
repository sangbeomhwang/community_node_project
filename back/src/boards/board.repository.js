class BoardRepository {
  constructor({ Boards, Op }) {
    this.board = Boards;
    this.Op = Op
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
      console.log("bye");
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

  async findList({ keyword }) {
    try {
      const response = await this.board.findAll({
        where: { 
          [this.Op.or]: [
            { title: { [this.Op.like]: `%${keyword}%` } },
            { nickname: { [this.Op.like]: `%${keyword}%` } }
          ]
        }, raw: true})
      // console.log('Repository=============',response)
      return response
    } catch (e) {
      throw new Error(e)
    }
  }
}

// where: { 
//   title: {[this.Op.like] : `%${keyword}%`}, 
//   nickname: {[this.Op.like] : `%${keyword}%`}
// }, raw: true  

module.exports = BoardRepository;
