const {
  sequelize: {
    models: { Boards, Comments, Likes, Hashes, Users },
  },
  Sequelize: { Op },
} = require("../../models");

const DateFormat = require("../../lib/dateformat");
const BoardRepository = require("./board.repository");
const BoardService = require("./board.service");
const BoardController = require("./board.controller");

const boardRepository = new BoardRepository({ Boards, Op, Comments, Likes, Hashes, Users });
const boardService = new BoardService({ boardRepository, DateFormat });
const boardController = new BoardController({ boardService });

module.exports = {
  boardController,
};
