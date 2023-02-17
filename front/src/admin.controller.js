const config = require("../config");
const axios = require("axios");
const request = axios.create({
  baseURL: `http://${config.server.host}:${config.server.port}`,
  withCredentials: true,
});

class AdminController {
  constructor() {
    this.server = `http://${config.server.host}:${config.server.port}/`;
  }

  async getIndex(req, res, next) {
    try {
      // console.log("admin 전달 확인용 : ", req.user);
      const { userid, nickname, image, level } = req.user;
      res.render("admin/admin_index.html", {
        userid,
        nickname,
        image,
        level,
        server: this.server,
      });
    } catch (e) {
      next(e);
    }
  }

  async getUsers(req, res, next) {
    try {
      const { userid, nickname, name, image, email, level } = req.user;
      const { data } = await request.get(`/admins/userlist`, {
        ...req.body,
      });
      const response = data.response;
      const userCount = data.userCount;
      // console.log("check!!!! : ", response);
      // console.log("check@@@@ : ", userCount);
      res.render("admin/admin_user.html", {
        userid,
        nickname,
        name,
        image,
        email,
        level,
        response,
        userCount,
        server: this.server,
      });
    } catch (e) {
      next(e);
    }
  }

  async updateUser(req, res, next) {
    try {
      const { nickname } = req.params;
      // console.log("nickname check ~~~ : ", nickname);
      // const { data } = await request.put(`/admins/${nickname}`, {
      //   ...req.body,
      // });
      // console.log("update success~~~ : ", data); // 수정 성공 시 result => update success~~~ :  [ 1 ]

      await request.put(`/admins/${nickname}`, {
        ...req.body,
      });

      res.redirect("/admins/users");
    } catch (e) {
      next(e);
    }
  }

  // async deleteUser(req, res, next) {
  //   try {
  //     // const { nickname } = req.user;
  //     const { nickname } = req.params;
  //     const { data } = await request.delete(`/admins/${nickname}`);
  //     res.render("admin/admin_user.html", { data, nickname });
  //   } catch (e) {
  //     next(e);
  //   }
  // }

  async getBoards(req, res, next) {
    try {
      const { userid, nickname, image, level, access } = req.user;
      const { data } = await request.get(`/boards`);
      // console.log("check1!!! : ", data);
      // console.log("check2!!! : ", data.pagination);
      // console.log("check3!!! : ", data.pagination.totalBoards);

      const totalBoards = data.pagination.totalBoards;
      const page = data.pagination.page;

      res.render("admin/admin_board.html", {
        userid,
        nickname,
        image,
        level,
        access,
        totalBoards,
        page,
        server: this.server,
      });
    } catch (e) {
      next(e);
    }
  }

  async updateBoard(req, res, next) {
    try {
      const { boardidx } = req.params;
      // const { data } = await request.put(`/admins/${nickname}`, {
      //   ...req.body,
      // });
      // console.log("update success~~~ : ", data); // 수정 성공 시 result => update success~~~ :  [ 1 ]

      await request.post(`/admins/${boardidx}`, {
        ...req.body,
      });

      res.redirect("/admins/boards");
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
        server: this.server,
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
