const {
  sequelize: {
    models: { Hashes, Hashtags },
  },
} = require("../../models");

const HashRepository = require("./hash.repository");
const HashService = require("./hash.service");
const HashController = require("./hash.controller");

const hashRepository = new HashRepository({ Hashes, Hashtags });
const hashService = new HashService({ hashRepository });
const hashController = new HashController({ hashService });

module.exports = {
  hashController,
};
