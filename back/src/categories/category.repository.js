class CategoryRepository {
  constructor({ Categories, SubCategories }) {
    this.Categories = Categories;
    this.SubCategories = SubCategories;
  }

  async findCategory({ mainidx }) {
    try {
      // get mainidx
      if (!mainidx) {
        const result = await this.Categories.findAll({ attributes: { exclude: "id" }, raw: true });
        return result;
      }

      // get mainidx, subidx
      const result = await this.Categories.findAll({ where: { mainidx }, include: [{ model: this.SubCategories, required: true, attributes: { exclude: "mainidx" } }] });
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }

  //   async findSubCategory({ mainidx, subidx }) {
  //     try {
  //       if (!subidx) {
  //         const result = await this.SubCategories.findAll({ where: { mainidx }, attributes: { exclude: "id" }, raw: true });
  //         return result;
  //       }
  //     } catch (e) {
  //       throw new Error(e);
  //     }
  //   }
}

module.exports = CategoryRepository;
