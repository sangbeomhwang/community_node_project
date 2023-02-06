const {
  sequelize: {
    models: { Users },
  },
} = require("../../models");

const AuthRepository = require("./auth.repository");
const AuthService = require("./auth.service");
const AuthController = require("./auth.controller");

const { jwt } = require("../../config");

const authRepository = new AuthRepository({ Users });
const authService = new AuthService({ authRepository, jwt });
const authController = new AuthController({ authService });

module.exports = {
  authController,
};
