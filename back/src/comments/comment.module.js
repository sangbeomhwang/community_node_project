const {
  sequelize: {
    models: { Comments, Users, Points },
  },
} = require("../../models");

const DateFormat = require("../../lib/dateformat");
const CommentRepository = require("./comment.repository");
const CommentService = require("./comment.service");
const CommentController = require("./comment.controller");

const commentRepository = new CommentRepository({ Comments, Users, Points });
const commentService = new CommentService({ commentRepository, DateFormat });
const commentController = new CommentController({ commentService });

module.exports = {
  commentController,
};
