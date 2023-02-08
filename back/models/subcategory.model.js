module.exports = (sequelize, Sequelize) => {
  class SubCategorys extends Sequelize.Model {
    static initialize() {
      return this.init(config, settings);
    }
  }

  const config = {
    mainidx: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    subidx: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
  };

  const settings = {
    sequelize,
  };

  SubCategorys.initialize();
};
