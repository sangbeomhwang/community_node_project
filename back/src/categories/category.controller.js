class CateogryController {
  constructor({ categoryService }) {
    this.categoryService = categoryService;
  }

  async getCategory(req, res, next) {
    try {
      const { mainidx } = req.query;
      const result = await this.categoryService.findCategoryList({ mainidx });
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  //   async getSubCategory(req, res, next) {
  //     try {
  //       const { mainidx, sudidx } = req.query;
  //       const result = await this.categoryService.findSubCategoryList({ mainidx, sudidx });
  //       res.json(result);
  //     } catch (e) {
  //       next(e);
  //     }
  //   }
}

module.exports = CateogryController;
