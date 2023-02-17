class LikeRepository {
  constructor({ Likes }) {
    this.Likes = Likes;
  }

  async count({ boardidx }) {
    try {
      const response = await this.Likes.count({ where: { boardidx }, raw: true });
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }

  //   async findOne({ boardidx, nickname }) {
  //     try {
  //       const response = await this.Likes.findOne({ where: { boardidx, nickname }, raw: true });
  //       return response;
  //     } catch (e) {
  //       throw new Error(e);
  //     }
  //   }

  async getLikes({ boardidx, nickname }) {
    try {
      const response = await this.Likes.findOne({ where: { boardidx, nickname }, raw: true });
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }

  async likesCount({ boardidx, nickname }) {
    try {
      const [data, clicked] = await this.Likes.findOrCreate({ where: { boardidx, nickname }, raw: true });
      if (!clicked) {
        await this.Likes.destroy({ where: { boardidx, nickname } });
      }
      const count = await this.count({ boardidx });
      return { count, clicked };
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = LikeRepository;
