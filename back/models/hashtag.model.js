module.exports = (sequelize, Sequelize) => {
  class Hashtags extends Sequelize.Model {
    static initilize() {
      return this.init(config, setting);
    }

    static associate(models) {
      this.belongsToMany(models.Boards, {
        through: "Hashes",
        foreignKey: "tag",
      });
    }
  }

  const config = {
    tag: {
      type: Sequelize.STRING(60),
      primaryKey: true,
    },
  };

  const setting = {
    sequelize,
  };

  Hashtags.initilize();
};
