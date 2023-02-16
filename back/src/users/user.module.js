const {
  sequelize: {
    models: { Users },
  },
} = require("../../models");
const qs = require("qs");
const axios = require("axios");

const UserRepository = require("./user.repository");
const UserService = require("./user.service");
const UserController = require("./user.controller");

const { jwt } = require("../../config");

const userRepository = new UserRepository({ Users });
const userService = new UserService({ userRepository, jwt, qs, axios });
const userController = new UserController({ userService });

module.exports = {
  userController,
};
