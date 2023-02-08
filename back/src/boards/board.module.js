const {
  sequelize: {
    models: { Boards },
  },
  Sequelize : {Op}
} = require("../../models");

const DateFormat = require("../../lib/dateformat");
const BoardRepository = require("./board.repository");
const BoardService = require("./board.service");
const BoardController = require("./board.controller");

const boardRepository = new BoardRepository({ Boards, Op });
const boardService = new BoardService({ boardRepository, DateFormat });
const boardController = new BoardController({ boardService });

module.exports = {
  boardController,
};
