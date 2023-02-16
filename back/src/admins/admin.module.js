const {
  sequelize: {
    models: { Users, Boards },
  },
} = require("../../models");

// 확인용 코드
// const User = models.User;


const DateFormat = require("../../lib/dateformat");
const AdminRepository = require("./admin.repository");
const AdminService = require("./admin.service");
const AdminController = require("./admin.controller");

const adminRepository = new AdminRepository({ Users, Boards });
const adminService = new AdminService({ adminRepository, DateFormat });
const adminController = new AdminController({ adminService });

module.exports = {
  adminController,
};
