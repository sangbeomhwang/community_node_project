const {
  sequelize: {
    models: { Users },
  },
} = require("../../models");

// 확인용 코드
// const User = models.User;
// console.log("gfgfgf", models);

const UserRepository = require("./user.repository");
const UserService = require("./user.service");
const UserController = require("./user.controller");

const { jwt } = require("../../config");

const userRepository = new UserRepository({ Users });
const userService = new UserService({ userRepository, jwt });
const userController = new UserController({ userService });

module.exports = {
  userController,
};
