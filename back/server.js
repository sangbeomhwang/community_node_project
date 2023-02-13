require("dotenv").config();
const app = require("./app");
const { sequelize } = require("./models");

const fs = require("fs");
const path = require("path");

app.listen(process.env.PORT, async () => {
  await sequelize.sync({ force: false });

  // const category = require("./dummy/Categories_dummy");
  // const subCategory = require("./dummy/SubCategories_dummy");
  // const board = require("./dummy/Boards_dummy");
  // const user = require("./dummy/Users_dummy");

  // for (let i = 0; i < category.length; i++) {
  //   await sequelize.models.Categories.create(category[i]);
  // }
  // for (let i = 0; i < subCategory.length; i++) {
  //   await sequelize.models.SubCategories.create(subCategory[i]);
  // }
  // for (let i = 0; i < user.length; i++) {
  //   await sequelize.models.Users.create(user[i]);
  // }

  // for (let i = 0; i < board.length; i++) {
  //   await sequelize.models.Boards.create(board[i]);
  // }

  // await sequelize.models.Comments.create({ content: "hello2", nickname: "cloud", boardidx: 2 });
  // await sequelize.models.Comments.create({ content: "hello1", nickname: "cloud", boardidx: 2 });
  // await sequelize.models.Hashtags.create({ tag: "nodejs" });
  // await sequelize.models.Hashtags.create({ tag: "javascript" });
  // await sequelize.models.Hashtags.create({ tag: "python" });
  // await sequelize.models.Hashes.create({ boardidx: 2, tag: "nodejs" });
  // await sequelize.models.Hashes.create({ boardidx: 2, tag: "javascript" });
  // await sequelize.models.Hashes.create({ boardidx: 9, tag: "javascript" });
  // await sequelize.models.Hashes.create({ boardidx: 9, tag: "python" });

  console.log(`Back Server Start ${process.env.PORT}`);
});
