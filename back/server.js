require("dotenv").config();
const app = require("./app");
const { sequelize } = require("./models");
const boardDumy = require("./dumy/board_dumy");

app.listen(process.env.PORT, async () => {
  await sequelize.sync({ force: true });

  for (let i = 0; i < boardDumy.length; i++) {
    sequelize.models.Boards.create(boardDumy[i]);
  }
  console.log(`Back Server Start ${process.env.PORT}`);
});
