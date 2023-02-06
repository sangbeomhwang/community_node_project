require("dotenv").config();
const app = require("./app");
const { sequelize } = require("./models");

app.listen(process.env.PORT, async () => {
  await sequelize.sync({ force: true });
  console.log(`Back Server Start`);
});
