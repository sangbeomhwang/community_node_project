class AuthController {
  constructor({ authService }) {
    this.authService = authService;
  }
  async postLogin(req, res, next) {
    try {
      const { userid, password } = req.body;
      const token = await this.authService.token({ userid, password });
      res.json({ token });
    } catch (e) {
      next(e);
    }
  }
}

module.exports = AuthController;
