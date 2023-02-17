class HashRepository {
  constructor({ Hashes, Hashtags }) {
    this.Hashes = Hashes;
    this.Hashtags = Hashtags;
  }

  async findAll({ boardidx }) {
    try {
      const response = this.Hashes.findAll({ where: { boardidx }, raw: true, attributes: { exclude: ["boardidx"] } });
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }

  async findOrCreate({ hashes, boardidx }) {
    try {
      const hashtags = hashes.map((tag) => this.Hashtags.findOrCreate({ where: { tag } }));
      await Promise.all(hashtags);
      const hash = hashes.map((tag) => this.Hashes.create({ boardidx, tag }));
      await Promise.all(hash);
      return true;
    } catch (e) {
      throw new Error(e);
    }
  }

  async createOrRemove({ add, diff, boardidx }) {
    try {
      if (add) {
        const hashtags = add.map((tag) => this.Hashtags.findOrCreate({ where: { tag } }));
        await Promise.all(hashtags);
        const hash = add.map((tag) => this.Hashes.create({ boardidx, tag }));
        await Promise.all(hash);
      }

      if (diff) {
        const removeHash = diff.map((tag) => this.Hashes.destroy({ where: { boardidx, tag } }));
        await Promise.all(removeHash);
      }
      return true;
    } catch (e) {}
  }
}

module.exports = HashRepository;
