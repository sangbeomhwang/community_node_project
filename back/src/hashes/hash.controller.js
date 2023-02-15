class HashController {
  constructor({ hashService }) {
    this.hashService = hashService;
  }

  async postHashes(req, res, next) {
    try {
      const { hashes, boardidx } = req.body;
      const response = await this.hashService.postHashList({ hashes, boardidx });
      res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async putHashes(req, res, next) {
    try {
      const { hashes, boardidx } = req.body;
      const response = await this.hashService.putHashList({ hashes, boardidx });
      res.json(response);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = HashController;
