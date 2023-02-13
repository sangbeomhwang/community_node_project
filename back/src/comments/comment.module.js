const {
    sequelize: {
        models: { Comments, Users },
    },
} = require('../../models')

const CommentRepository = require('./comment.repository')
const CommentService = require('./comment.service')
const CommentController = require('./comment.controller')

const commentRepository = new CommentRepository({ Comments, Users })
const commentService = new CommentService({ commentRepository })
const commentController = new CommentController({ commentService })

module.exports = {
    commentController
}