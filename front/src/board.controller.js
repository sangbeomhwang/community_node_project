const axios = require("axios");
const request = axios.create({
  baseURL: "http://127.0.0.1:3000",
  withCredentials: true,
});

class BoardController {
  async getBoard(req, res, next) {
    try {
      const { nickname, image, level, access } = req.user;
      res.render("board/board.html", {
        nickname,
        image,
        level,
        access,
      });
    } catch (e) {
      next(e);
    }
  }

  async getWrite(req, res, next) {
    try {
      const { nickname, image, level, access } = req.user;
      res.render("board/write.html", {
        nickname,
        image,
        access,
        level,
      });
    } catch (e) {
      next(e);
    }
  }

  async postWrite(req, res, next) {
    try {
      const { nickname, image, level, access } = req.user;
      res.redirect("/boards", {
        nickname,
        image,
        access,
        level,
      });
    } catch (e) {
      next(e);
    }
  }

  async getView(req, res, next) {
    try {
      const { nickname, image, level, access } = req.user;
      // console.log("=====================",req.user)
      const { boardidx } = req.params;
      res.render("board/view.html", {
        nickname,
        image,
        access,
        boardidx,
        level,
      });
    } catch (e) {
      next(e);
    }
  }

  async getModify(req, res, next) {
    try {
      const { nickname, image, level, access } = req.user;
      const { boardidx } = req.params;
      res.render("board/modify.html", {
        nickname,
        image,
        access,
        boardidx,
        level,
      });
    } catch (e) {
      next(e);
    }
  }

  async putModify(req, res, next) {
    try {
      const boardidx = req.params;
      res.redirect(`/boards/${boardidx}`);
    } catch (e) {
      next(e);
    }
  }
}

const boardController = new BoardController();

module.exports = {
  boardController,
};
