module.exports = (sequelize, Sequelize) => {
  class Boards extends Sequelize.Model {
    static initialize() {
      return this.init(config, settings);
    }

    static associate(models) {
      // this.hasMany(models.Likes, {
      //   foreignKey: "boardidx",
      // });
      // this.hasMany(models.Hashes, {
      //   foreignKey: "boardidx",
      // });
      this.belongsTo(models.Users, {
        foreignKey: "nickname",
      });
      this.belongsTo(models.Categories, {
        foreignKey: "mainidx",
      });
      this.belongsTo(models.SubCategories, {
        foreignKey: "subidx",
      });
      this.belongsToMany(models.Hashtags, {
        through: "Hashes",
        foreignKey: "boardidx",
      });
      this.belongsToMany(models.Users, {
        through: "Likes",
        foreignKey: "boardidx",
      });
      this.hasMany(models.Comments, {
        foreignKey: "boardidx",
      });
    }
  }

  const config = {
    boardidx: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    // nickname: {
    //   type: Sequelize.STRING(30),
    //   allowNull: false,
    // },
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
    visible: {
      type: Sequelize.ENUM("visible", "invisible"),
      allowNull: false,
      defaultValue: "visible",
    }
  };

  const settings = {
    sequelize,
  };

  Boards.initialize();
};
