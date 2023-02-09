const express = require('express')
const router = express.Router()
const { commentController: controller } = require('./comments.module')

router.get('/', (req, res, next) => controller.getListComment(req, res, next))
router.post('/', (req, res, next) => controller.postOneComment(req, res, next))
router.put('/:commentidx', (req, res, next) => controller.putComment(req, res, next))
router.delete('/:commentidx', (req, res, next) => controller.deleteComment(req, res, next))

module.exports = router