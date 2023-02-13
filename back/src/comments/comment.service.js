class CommentService {
    constructor({ commentRepository }) {
        this.commentRepository = commentRepository
    }

    async list({ boardidx }) {
        try {
            const response = await this.commentRepository.commentList({ boardidx })
            // console.log('#################',response)
            return response
        } catch (e) {
            throw new Error(e)
        }
    }

    async write({ boardidx, nickname, content, depth, party }) {
        try {
            const response = await this.commentRepository.commentWrite({ boardidx, nickname, content, depth, party })
            return response
        } catch (e) {
            throw new Error(e)
        }
    }

    async modify({ commentidx, boardidx, nickname, content }) {
        try {
            const response = await this.commentRepository.commentUpdate({ commentidx, boardidx, nickname, content })
            return response
        } catch (e) {
            throw new Error(e)
        }
    }

    async delete({ commentidx }) {
        try {
            const response = await this.commentRepository.commentDelete({ commentidx })
            return response
        } catch (e) {
            throw new Error(e)
        }
    }
}

module.exports = CommentService