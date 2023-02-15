const express = require('express')
const router = express.Router()
const { commentController: controller } = require('./comment.module')

router.get('/', (req, res, next) => controller.getComment(req, res, next))
router.post('/', (req, res, next) => controller.postComment(req, res, next))
router.put('/', (req, res, next) => controller.putComment(req, res, next))
router.delete('/', (req, res, next) => controller.deleteComment(req, res, next))

module.exports = router