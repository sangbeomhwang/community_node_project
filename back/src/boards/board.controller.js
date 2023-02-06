class BoardController {
  constructor({ boardService }) {
    this.boardService = boardService;
  }

  async getList(req, res, next) {
    try {
      //   const { token } = req.cookies;
      const { mainidx, subidx } = req.query;
      const itemList = await this.boardService.list({ mainidx, subidx });
      //   res.setHeader('Set-Cookie')
      res.json(itemList);
    } catch (e) {
      next(e);
    }
  }
  async getOne(req, res, next) {
    try {
      const { boardidx } = req.params;
      const itemView = await this.boardService.view({ boardidx });
      res.json(itemView);
    } catch (e) {
      next(e);
    }
  }

  async postOne(req, res, next) {
    try {
      // const userid = req.cookies.token
      console.log(req.body);
      const itemOne = await this.boardService.write({ ...req.body });
      res.json(itemOne);
    } catch (e) {
      next(e);
    }
  }

  async putOne(req, res, next) {
    try {
      const { boardidx } = req.params;
      const itemPut = await this.boardService.modify({ boardidx, ...req.body });
      res.json(itemPut);
    } catch (e) {
      next(e);
    }
  }

  async deleteOne(req, res, next) {
    try {
      const { boardidx } = req.params;
      const itemdelte = await this.boardService.deleteBoard({ boardidx });
      res.json(itemdelte);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = BoardController;
