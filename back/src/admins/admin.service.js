class AdminService {
  constructor({ adminRepository }) {
    this.adminRepository = adminRepository;
  }

  async userList() {
    try {
      const response = await this.adminRepository.list();
      const userCount = response.length;
      // console.log("#################", response);
      // console.log("###~~~~~~", userCount);
      return { response, userCount };
    } catch (e) {
      throw new Error(e);
    }
  }

  async userModify({ nickname, name, email, level, access }) {
    try {
      const result = await this.adminRepository.userUpdate({
        nickname,
        name,
        email,
        level,
        access,
      });
      return result;
    } catch (e) {
      throw new Error(e);
    }
  }

  // async userDelete({ nickname }) {
  //   try {
  //     const response = await this.adminRepository.userDestroy({ nickname });
  //     console.log("#################", response);
  //     return response;
  //   } catch (e) {
  //     next(e);
  //   }
  // }
}

module.exports = AdminService;
