const {
  sequelize: {
    models: { Users },
  },
} = require("../../models");

// 확인용 코드
// const User = models.User;
// console.log("gfgfgf", models);

const AdminRepository = require("./admin.repository");
const AdminService = require("./admin.service");
const AdminController = require("./admin.controller");

const adminRepository = new AdminRepository({ Users });
const adminService = new AdminService({ adminRepository });
const adminController = new AdminController({ adminService });

module.exports = {
  adminController,
};
