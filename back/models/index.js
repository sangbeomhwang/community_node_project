const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const config = require("../config")["db"][process.env.NODE_ENV];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf("model") !== -1)
  .forEach((file) => require(path.join(__dirname, file))(sequelize, Sequelize));

module.exports = {
  sequelize,
  Sequelize,
};
