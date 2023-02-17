class BoardRepository {
  constructor({ Boards, Op, Comments, Likes, Hashes, Users, Points }) {
    this.Boards = Boards;
    this.Op = Op;
    this.Comments = Comments;
    this.Likes = Likes;
    this.Hashes = Hashes;
    this.Users = Users;
    this.Points = Points;
  }

  async findAndCountAll({
    mainidx,
    subidx,
    page,
    maxBoards,
    target,
    sort,
    level,
  }) {
    try {
      if (level) {
        const boardList = await this.Boards.findAndCountAll({
          order: [[target, sort]],
          raw: true,
        });
        return boardList;
      }
      if (!mainidx) {
        const boardList = await this.Boards.findAndCountAll({
          limit: maxBoards,
          offset: (page - 1) * maxBoards,
          order: [[target, sort]],
          raw: true,
          where: { visible: "visible" },
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
            visible: "visible",
          },
          raw: true,
        });
        return boardList;
      }
      const boardList = await this.Boards.findAndCountAll({
        limit: maxBoards,
        offset: (page - 1) * maxBoards,
        order: [[target, sort]],
        where: { mainidx, subidx, visible: "visible" },
        raw: true,
      });
      return boardList;
    } catch (e) {
      throw new Error(e);
    }
  }

  async findOne({ boardidx }) {
    try {
      const boardOne = await this.Boards.findOne({
        where: { boardidx },
        raw: true,
      });
      return boardOne;
    } catch (e) {
      throw new Error(e);
    }
  }

  async create({ title, content, nickname, mainidx, subidx }) {
    try {
      const boardPost = await this.Boards.create({
        title,
        content,
        nickname,
        mainidx,
        subidx,
      });
      await this.Points.create({ nickname, pointCount: "board" });
      return boardPost;
    } catch (e) {
      throw new Error(e);
    }
  }

  async update({ boardidx, title, content, nickname, mainidx, subidx }) {
    try {
      const boardPut = await this.Boards.update(
        { title, content, nickname, mainidx, subidx },
        { where: { boardidx } }
      );
      return boardPut;
    } catch (e) {
      throw new Error(e);
    }
  }

  async delBoard({ boardidx }) {
    try {
      const delBoard = await this.Boards.destroy({ where: { boardidx } });
      return delBoard;
    } catch (e) {
      throw new Error(e);
    }
  }

  async findList({ keyword }) {
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

  async findCommentsCount({ boardidx }) {
    try {
      const response = await this.Comments.count({
        where: {
          boardidx,
        },
      });
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }

  async findLikesCount({ boardidx }) {
    try {
      const response = await this.Likes.count({
        where: {
          boardidx,
        },
      });
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }

  async findImage({ nickname }) {
    try {
      const response = await this.Users.findOne({
        where: {
          nickname,
        },
        attributes: ["image"],
        raw: true,
      });
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }

  async findHashtags({ boardidx }) {
    try {
      const response = await this.Hashes.findAll({
        where: {
          boardidx,
        },
        attributes: { exclude: "boardidx" },
        raw: true,
      });

      return response;
    } catch (e) {
      throw new Error(e);
    }
  }

  async incrementHit({ boardidx }) {
    try {
      const response = await this.Boards.increment(
        { hit: 1 },
        { where: { boardidx } }
      );
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = BoardRepository;
