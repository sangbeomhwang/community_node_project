const {
  sequelize: {
    models: { Categories, SubCategories },
  },
} = require("../../models");

const CategoryRepository = require("./category.repository");
const CategoryService = require("./category.service");
const CategoryController = require("./category.controller");

const categoryRepository = new CategoryRepository({ Categories, SubCategories });
const categoryService = new CategoryService({ categoryRepository });
const categoryController = new CategoryController({ categoryService });

module.exports = {
  categoryController,
};
