class CommentRepository {
    constructor({ Comments }) {
        this.comment = Comments
    }

    async commentList({ boardidx }) {
        try{
            const response = await this.comment.findAll({
                where: {
                    boardidx,
                },
                raw: true,
            })
            // console.log('^^^^^^^^^', response)
            return response
        } catch (e) {
            throw new Error(e)
        }    
    }

    async commentWrite({ boardidx, nickname, content, depth, party }) {
        try {
            const response = await this.comment.create({ boardidx, nickname, content, depth, party })
            // console.log('^^^^^^^^^', response)
            return response
        } catch (e) {
            throw new Error(e)
        }
    }

    async commentUpdate({ commentidx, boardidx, nickname, content }) {
        try {
            const response = await this.comment.update(
                { content, nickname, boardidx, },
                { where: { commentidx }},
            )
            return response
        } catch(e) {
            throw new Error(e)
        }
    }

    async commentDelete({ commentidx }) {
        try {
            const response = await this.comment.destroy({ where: { commentidx } })
            return response
        } catch (e) {
            throw new Error(e)
        }
    }
}

module.exports = CommentRepository