module.exports = (sequelize, Sequelize) => {
  class Categories extends Sequelize.Model {
    static initialize() {
      return this.init(config, settings);
    }
    static associate(models) {
      this.hasMany(models.Boards, {
        foreignKey: "mainidx",
      });
      this.hasMany(models.SubCategories, {
        foreignKey: "mainidx",
      });
    }
  }

  const config = {
    mainidx: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
  };

  const settings = {
    sequelize,
  };

  Categories.initialize();
};
