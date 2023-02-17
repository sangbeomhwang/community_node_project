class CommentController {
  constructor({ commentService }) {
    this.commentService = commentService;
  }

  async getComment(req, res, next) {
    try {
      const { boardidx } = req.query;
      // console.log(req.query)
      const response = await this.commentService.list({ boardidx });
      // console.log("@@@@@@@@@@@@@", response);
      res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async postComment(req, res, next) {
    try {
      // console.log("+++++++++++++++",req.body)
      const response = await this.commentService.write({ ...req.body });
      // console.log("%%%%%%%%%%%%%",response)
      res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async putComment(req, res, next) {
    try {
      const { commentidx } = req.query;
      const response = await this.commentService.modify({
        commentidx,
        ...req.body,
      });
      res.json(response);
    } catch (e) {
      next(e);
    }
  }

  async deleteComment(req, res, next) {
    try {
      const { commentidx } = req.query;
      // console.log("Result :::: ",req.query)
      const response = await this.commentService.delete({ commentidx });
      // console.log("DeleteReult ::::: ",response)
      res.json(response);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = CommentController;
