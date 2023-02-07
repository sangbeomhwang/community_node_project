const axios = require("axios");
const Regidate = require("../lib/regidate");
const request = axios.create({
  baseURL: "http://127.0.0.1:3000",
  withCredentials: true,
});

class BoardController {
  async getBoard(req, res, next) {
    try {
      const { mainidx, subidx } = req.query;
      console.log(mainidx);
      const response = await request.get(`/boards?mainidx=${mainidx}&subidx=${subidx}`);
      // console.log(response.data);
      res.render("board/board.html", { response: response.data });
    } catch (e) {
      next(e);
    }
  }

  async getWrite(req, res, next) {
    try {
      res.render("board/write.html");
    } catch (e) {
      next(e);
    }
  }

  async postWrite(req, res, next) {
    try {
      res.redirect("/boards");
    } catch (e) {
      next(e);
    }
  }

  async getView(req, res, next) {
    try {
      const { boardidx } = req.params;
      const {
        data: { register, ...rest },
      } = await request.get(`/boards/${boardidx}`);

      let date = new Regidate(register);
      date = date.dateformat();

      const result = { ...rest, register: date };
      // console.log(result);

      res.render("board/view.html", { ...result });
    } catch (e) {
      next(e);
    }
  }

  async getModify(req, res, next) {
    try {
      res.render("board/modify.html");
    } catch (e) {
      next(e);
    }
  }

  async putModify(req, res, next) {
    try {
      res.send("good");
    } catch (e) {
      next(e);
    }
  }
}

const boardController = new BoardController();

module.exports = {
  boardController,
};
