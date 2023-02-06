require("dotenv").config();
const crypto = require("crypto");
const JWT = require("./lib/jwt");
const env = process.env;
const salt = env.SALT;

const config = {
  port: env.PORT,
  jwt: new JWT({ crypto, salt }),
  db: {
    development: {
      username: env.DB_USER || "foo",
      password: env.DB_PASSWORD || "1q2w3e4r!",
      port: env.DB_PORT || "1234",
      host: env.DB_HOST || "0.0.0.0",
      database: env.DB_DATABASE || "",
      dialect: env.DB_DIALECT || "",
      define: {
        freezeTableName: true,
        timestamps: false,
      },
    },
  },
};

module.exports = config;
