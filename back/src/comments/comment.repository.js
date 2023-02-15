class CommentRepository {
    constructor({ Comments, Users }) {
        this.comment = Comments
        this.Users = Users
    }

    async commentList({ boardidx }) {
        try{
            const response = await this.comment.findAll({
                where: {
                    boardidx,
                },
                include: [{model: this.Users, required:true, attributes:["image"]  }],
                raw: true,
                nest: true
            })
            // console.log('^^^^^^^^^', response)
            return response
        } catch (e) {
            throw new Error(e)
        }    
    }

    async commentWrite({ boardidx, nickname, content, depth, party, commentidx}) {
        try {
            const response = await this.comment.create({ boardidx, nickname, content, depth, party, commentidx })
            console.log('^^^^^^^^^', response)
            return response.dataValues
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