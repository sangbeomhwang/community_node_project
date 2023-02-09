module.exports = (sequelize, Sequelize) => {
  class Users extends Sequelize.Model {
    static initialize() {
      return this.init(config, settings);
    }

    static associate(models) {
      this.hasMany(models.Boards, {
        foreignKey: "userid",
      });

      this.hasMany(models.Points, {
        foreignKey: "userid",
      });

      this.belongsToMany(models.Boards, {
        through: 'Likes',
        foreignKey: 'userid',
      });
      this.hasMany(models.Comments, {
        foreignKey: 'userid',
      })
      this.hasMany(models.Chats, {
        foreignKey: "userid",
      });
    }
  }

  const config = {
    userid: {
      type: Sequelize.STRING(60),
      primaryKey: true,
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
      allowNull: false,
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
      allowNull: false,
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
      type: Sequelize.ENUM('normal', 'top'),
      allowNull: false,
      defaultValue: 'normal',
    },
    access: {
      type: Sequelize.ENUM('ok', 'deny'),
      allowNull: false,
      defaultValue: 'ok'
    }
  };

  const settings = {
    sequelize,
  };

  Users.initialize();
};
