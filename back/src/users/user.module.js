const {
  sequelize: {
    models: { Users, Boards, Comments, Likes, Points },
  },
} = require("../../models");
const { sequelize } = require("../../models");
const qs = require("qs");
const axios = require("axios");

const DateFormat = require("../../lib/dateformat");
const UserRepository = require("./user.repository");
const UserService = require("./user.service");
const UserController = require("./user.controller");

const { jwt } = require("../../config");

const userRepository = new UserRepository({ Users, Boards, Comments, Likes, Points, sequelize });
const userService = new UserService({ userRepository, jwt, qs, axios, DateFormat });
const userController = new UserController({ userService });

module.exports = {
  userController,
};
