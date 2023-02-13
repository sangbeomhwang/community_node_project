class HashService {
  constructor({ hashRepository }) {
    this.hashRepository = hashRepository;
  }

  async postHashList({ hashes, boardidx }) {
    try {
      const response = await this.hashRepository.findOrCreate({ hashes, boardidx });
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = HashService;
