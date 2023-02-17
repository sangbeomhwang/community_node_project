class CommentService {
  constructor({ commentRepository, DateFormat }) {
    this.commentRepository = commentRepository;
    this.DateFormat = DateFormat;
  }

  async list({ boardidx }) {
    try {
      const response = await this.commentRepository.commentList({ boardidx });
      const userCount = response.length;
      // console.log('#################',response)
      // console.log(userCount);

      response.forEach((board) => {
        board.register = new this.DateFormat(board.register).dateformat();
      });
      // console.log("12345>>>>>>>>>>>>>>>>>>>>>>",response)

      return { response, userCount };
    } catch (e) {
      throw new Error(e);
    }
  }

  async write({ boardidx, nickname, writer, content, depth, party }) {
    try {
      console.log(writer);
      const response = await this.commentRepository.commentWrite({
        boardidx,
        nickname,
        content,
        depth,
        party,
      });
      if (nickname !== writer)
        await this.commentRepository.createPoints({ nickname });

      // console.log("<<<<<<<<<<<<<<<", response)
      // console.log('regitser :::: ', response.register)

      const test = new this.DateFormat(response.register).dateformat();
      // console.log(':::::::::::: ::: ', test)

      response.register = test;
      // console.log("================",response)

      return response;
    } catch (e) {
      throw new Error(e);
    }
  }

  async modify({ commentidx, boardidx, nickname, content }) {
    try {
      const response = await this.commentRepository.commentUpdate({
        commentidx,
        boardidx,
        nickname,
        content,
      });
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }

  async delete({ commentidx }) {
    try {
      const response = await this.commentRepository.commentDelete({
        commentidx,
      });
      return response;
    } catch (e) {
      throw new Error(e);
    }
  }
}

module.exports = CommentService;
