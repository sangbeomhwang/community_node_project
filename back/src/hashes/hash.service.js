class HashService {
  constructor({ hashRepository }) {
    this.hashRepository = hashRepository;
  }

  async checkHash({ hashes, boardidx }) {
    const response = await this.hashRepository.findAll({ boardidx });
    const result = response.reduce((acc, cur) => {
      const key = Object.keys(cur);
      acc.push(cur[key]);
      return acc;
    }, []);

    // 추가된 해시태그
    let add = hashes.filter((val) => !result.includes(val));
    if (add.length === 0) add = undefined;

    // 제거된 해시태그
    let diff = result.filter((val) => !hashes.includes(val));
    if (diff.length === 0) diff = undefined;
    return { add, diff };
  }

  async postHashList({ hashes, boardidx }) {
    try {
      const response = await this.hashRepository.findOrCreate({ hashes, boardidx });
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }

  async putHashList({ hashes, boardidx }) {
    try {
      const { add, diff } = await this.checkHash({ hashes, boardidx });
      const response = await this.hashRepository.createOrRemove({ add, diff, boardidx });
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = HashService;
