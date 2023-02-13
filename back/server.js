require("dotenv").config();
const app = require("./app");
const { sequelize } = require("./models");

const fs = require("fs");
const path = require("path");

app.listen(process.env.PORT, async () => {
  await sequelize.sync({ force: false });

  // const category = require("./dumy/Categories_dumy");
  // const subCategory = require("./dumy/SubCategories_dumy");
  // const board = require("./dumy/Boards_dumy");
  // const user = require("./dumy/Users_dumy");

  // for (let i = 0; i < category.length; i++) {
  //   await sequelize.models.Categories.create(category[i]);
  // }
  // for (let i = 0; i < subCategory.length; i++) {
  //   await sequelize.models.SubCategories.create(subCategory[i]);
  // }

  // for (let i = 0; i < board.length; i++) {
  //   await sequelize.models.Boards.create(board[i]);
  // }

  // for (let i = 0; i < user.length; i++) {
  //   await sequelize.models.Users.create(user[i]);
  // }

  console.log(`Back Server Start ${process.env.PORT}`);
});
