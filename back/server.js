require("dotenv").config();
const app = require("./app");
const { sequelize } = require("./models");
const fs = require("fs");
const path = require("path");

app.listen(process.env.PORT, async () => {
  await sequelize.sync({ force: true });

  const dumyDir = path.join(__dirname, "dumy");
  fs.readdirSync(dumyDir)
    .filter((file) => file.indexOf("dumy") !== -1)
    .forEach(async (file) => {
      const data = require(path.join(dumyDir, file));
      const modelName = file.split("_")[0];
      for (let i = 0; i < data.length; i++) {
        await sequelize.models[modelName].create(data[i]);
      }
    });

  console.log(`Back Server Start ${process.env.PORT}`);
});
