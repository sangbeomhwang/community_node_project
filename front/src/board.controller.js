const axios = require("axios");
const request = axios.create({
  baseURL: "http://127.0.0.1:3000",
  withCredentials: true,
});
// console.log(request)

class BoardController {
  async getBoard(req, res, next) {
    
    try {
      const { mainidx, subidx } = req.params
      const response = await request.get(`/boards?mainidx=${mainidx}&subidx=${subidx}`)
      console.log(response.data)
      res.render("board/board.html", {response : response.data});
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
      res.render("board/view.html");
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
