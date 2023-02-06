require("dotenv").config();
const env = process.env;

const config = {
  db: {
    development: {
      username: env.DB_USER || "foo",
      password: env.DB_PASSWORD || "1234",
      port: env.DB_PORT || "1234",
      host: env.DB_HOST || "0.0.0.0",
      database: env.DB_DATABASE || "foo",
      dialect: env.DB_DIALECT || "mssql",
      define: {
        freezeTableName: true,
        timestamps: false,
      },
    },
  },
};

module.exports = config;
