const {
    sequelize: {
        models: { Comments },
    },
} = require('../../models')

const CommentRepository = require('./comment.repository')
const CommentService = require('./comment.service')
const CommentController = require('./comment.controller')

const commentRepository = new CommentRepository({ Comments })
const commentService = new CommentService({ commentRepository })
const commentController = new CommentController({ commentService })

module.exports = {
    commentController
}