class LikeController {
  constructor({ likeService }) {
    this.likeService = likeService;
  }

  async getLikes(req, res, next) {
    try {
      const { boardidx, nickname } = req.query;
      const response = await this.likeService.getLikesUser({ boardidx, nickname });
      res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async putLikes(req, res, next) {
    try {
      const { boardidx, nickname } = req.query;
      const response = await this.likeService.putLikesCount({ boardidx, nickname });
      res.json(response);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = LikeController;
