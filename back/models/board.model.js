module.exports = (sequelize, Sequelize) => {
  class Boards extends Sequelize.Model {
    static initialize() {
      return this.init(config, settings);
    }
  }

  const config = {
    boardidx: {
      type: Sequelize.INTEGER,
      primaryKey: true,
    },
    nickname: {
      type: Sequelize.STRING(30),
      allowNull: false,
    },
    title: {
      type: Sequelize.STRING(128),
      allowNull: false,
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    hit: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    mainidx: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    subidx: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    register: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
  };

  const settings = {
    sequelize,
  };

  Boards.initialize();
};
