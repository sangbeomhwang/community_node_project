module.exports = (sequelize, Sequelize) => {
  class Users extends Sequelize.Model {
    static initialize() {
      return this.init(config, settings);
    }

    static associate(models) {
      this.hasMany(models.Boards, {
        foreignKey: "nickname",
      });

      this.hasMany(models.Points, {
        foreignKey: "nickname",
      });

      this.belongsToMany(models.Boards, {
        through: "Likes",
        foreignKey: "nickname",
      });
      this.hasMany(models.Comments, {
        foreignKey: "nickname",
      });
      this.hasMany(models.Chats, {
        foreignKey: "nickname",
      });
    }
  }

  const config = {
    userid: {
      type: Sequelize.STRING(60),
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING(64),
      allowNull: false,
    },
    image: {
      type: Sequelize.STRING(200),
      allowNull: true,
      defaultValue: "",
    },
    name: {
      type: Sequelize.STRING(30),
      allowNull: true,
    },
    nickname: {
      type: Sequelize.STRING(30),
      primaryKey: true,
    },
    gender: {
      type: Sequelize.ENUM("male", "female", "none"),
      allowNull: true,
      defaultValue: "none",
    },
    phonenumber: {
      type: Sequelize.STRING(13),
      allowNull: true,
    },
    email: {
      type: Sequelize.STRING(50),
      allowNull: true,
    },
    address: {
      type: Sequelize.STRING(128),
      allowNull: true,
    },
    sub_address: {
      type: Sequelize.STRING(64),
      allowNull: true,
    },
    introduce: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    social: {
      type: Sequelize.ENUM("local", "kakao"),
      allowNull: false,
      defaultValue: "local",
    },
    register: {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW,
    },
    level: {
      type: Sequelize.ENUM("normal", "top"),
      allowNull: false,
      defaultValue: "normal",
    },
    access: {
      type: Sequelize.ENUM("ok", "deny"),
      allowNull: false,
      defaultValue: "ok",
    },
  };

  const settings = {
    sequelize,
  };

  Users.initialize();
};
