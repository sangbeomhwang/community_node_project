class AdminService {
  constructor({ adminRepository }) {
    this.adminRepository = adminRepository;
  }

  async userList() {
    try {
      const response = await this.adminRepository.list();
      console.log("#################", response);
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }

  async userDelete({ nickname }) {
    try {
      const response = await this.adminRepository.userDestroy({ nickname });
      console.log("#################", response);
      return response;
    } catch (e) {
      next(e);
    }
  }
}

module.exports = AdminService;
