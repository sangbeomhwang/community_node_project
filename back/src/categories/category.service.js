class CategoryService {
  constructor({ categoryRepository }) {
    this.categoryRepository = categoryRepository;
  }

  async findCategoryList({ mainidx }) {
    try {
      const result = await this.categoryRepository.findCategory({ mainidx });
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }

  //   async findSubCategoryList({ mainidx, subidx }) {
  //     try {
  //       const result = await this.categoryRepository.findSubCategory({ mainidx, subidx });
  //       return result;
  //     } catch (e) {
  //       throw new Error(e);
  //     }
  //   }
}

module.exports = CategoryService;
