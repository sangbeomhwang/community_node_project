module.exports = (sequelize, Sequelize) => {
  class SubCategories extends Sequelize.Model {
    static initialize() {
      return this.init(config, settings);
    }
    static associate(models) {
      this.belongsTo(models.Categories, {
        foreignKey: "mainidx",
      });
      this.hasMany(models.Boards, {
        foreignKey: "subidx",
      });
    }
  }

  const config = {
    mainidx: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    subidx: {
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

  SubCategories.initialize();
};
