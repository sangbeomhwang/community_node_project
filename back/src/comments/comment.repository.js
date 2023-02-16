class CommentRepository {
  constructor({ Comments, Users, Points }) {
    this.comment = Comments;
    this.Users = Users;
    this.Points = Points;
  }

  async commentList({ boardidx }) {
    try {
      const response = await this.comment.findAll({
        where: {
          boardidx,
        },
        include: [{ model: this.Users, required: true, attributes: ["image"] }],
        raw: true,
        nest: true,
      });
      // console.log('^^^^^^^^^', response)
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }

  async commentWrite({ boardidx, nickname, content, depth, party }) {
    try {
      const response = await this.comment.create({ boardidx, nickname, content, depth, party });
      // console.log('^^^^^^^^^', response)
      return response.dataValues;
    } catch (e) {
      throw new Error(e);
    }
  }

  async commentUpdate({ commentidx, boardidx, nickname, content }) {
    try {
      const response = await this.comment.update({ content, nickname, boardidx }, { where: { commentidx } });
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }

  async commentDelete({ commentidx }) {
    try {
      const response = await this.comment.destroy({ where: { commentidx } });
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }

  async createPoints({ nickname }) {
    try {
      const response = await this.Points.create({ nickname, pointCount: "comment" });
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = CommentRepository;
