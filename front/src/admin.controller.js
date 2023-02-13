const axios = require("axios");
const request = axios.create({
  baseURL: "http://127.0.0.1:3000",
  withCredentials: true,
});

class AdminController {
  async getIndex(req, res, next) {
    try {
      // console.log("admin 전달 확인용 : ", req.user);
      const { userid, nickname, image, level } = req.user;
      res.render("admin/admin_index.html", {
        userid,
        nickname,
        image,
        level,
      });
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      const { userid, nickname, name, image, email, level } = req.user;
      res.render("admin/admin_user.html", {
        userid,
        nickname,
        name,
        image,
        email,
        level,
      });
    } catch (e) {
      next(e);
    }
  }

  async deleteUser(req, res, next) {
    try {
      // const { nickname } = req.user;
      const { nickname } = req.params;
      const { data } = await request.delete(`/admins/${nickname}`);
      res.render("admin/admin_user.html", { data, nickname });
    } catch (e) {
      next(e);
    }
  }

  async getBoards(req, res, next) {
    try {
      const { userid, nickname, image, level } = req.user;
      res.render("admin/admin_board.html", {
        userid,
        nickname,
        image,
        level,
      });
    } catch (e) {
      next(e);
    }
  }

  async getComments(req, res, next) {
    try {
      const { userid, nickname, image, level } = req.user;
      res.render("admin/admin_comment.html", {
        userid,
        nickname,
        image,
        level,
      });
    } catch (e) {
      next(e);
    }
  }
}

const adminController = new AdminController();

module.exports = {
  adminController,
};
