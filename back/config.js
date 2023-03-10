require("dotenv").config();
const crypto = require("crypto");
const JWT = require("./lib/jwt");
const env = process.env;
const salt = env.SALT;

const config = {
  env: env.NODE_ENV || "development",
  port: env.PORT || "",
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
  kakao: {
    host: env.KAKAO_HOST || "",
    rest_api_key: env.REST_API_KEY || "",
    redirect_uri: env.REDIRECT_URI || "",
    client_secret: env.CLIENT_SECRET || "",
  },
  server: {
    host: env.SERVER_HOST || "localhost",
    port: env.SERVER_PORT || "3005",
    my: env.MY_SERVER || "localhost",
    myPort: env.MY_PORT || "3000",
  },
};

module.exports = config;
