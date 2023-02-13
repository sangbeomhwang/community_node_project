class HashRepository {
  constructor({ Hashes, Hashtags }) {
    this.Hashes = Hashes;
    this.Hashtags = Hashtags;
  }

  async findOrCreate({ hashes, boardidx }) {
    try {
      const hashtags = hashes.map((tag) => this.Hashtags.findOrCreate({ where: { tag } }));
      await Promise.all(hashtags);
      const hash = hashes.map((tag) => this.Hashes.create({ boardidx, tag }));
      await Promise.all(hash);
      return;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = HashRepository;
