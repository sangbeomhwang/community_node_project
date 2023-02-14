class LikeService {
  constructor({ likeRepository }) {
    this.likeRepository = likeRepository;
  }

  async getLikesUser({ boardidx, nickname }) {
    try {
      const response = await this.likeRepository.getLikes({ boardidx, nickname });
      if (!response) return false;
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }

  async putLikesCount({ boardidx, nickname }) {
    try {
      //   const findNick = await this.likeRepository.findOne({ boardidx, nickname });
      //   const clicked = findNick === null ? false : true;
      //   const response = await this.likeRepository.likesCount({ boardidx, nickname, clicked });
      //   return { count: response, clicked: !clicked };
      const { count, clicked } = await this.likeRepository.likesCount({ boardidx, nickname });
      return { count, clicked };
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = LikeService;
