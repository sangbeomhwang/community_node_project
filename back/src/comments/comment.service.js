class CommentService {
    constructor({ commentRepository, DateFormat }) {
        this.commentRepository = commentRepository
        this.DateFormat = DateFormat
    }

    async list({ boardidx }) {
        try {
            const response = await this.commentRepository.commentList({ boardidx })
            // console.log('#################',response)

            response.forEach(board=>{
                board.register = new this.DateFormat(board.register).dateformat()
            })
            // console.log("12345>>>>>>>>>>>>>>>>>>>>>>",response)

            return response
        } catch (e) {
            throw new Error(e)
        }
    }

    async write({ boardidx, nickname, content, depth, party, register }) {
        try {
            const response = await this.commentRepository.commentWrite({ boardidx, nickname, content, depth, party, register})
            // console.log("<<<<<<<<<<<<<<<", response)
            console.log('regitser :::: ', response.register)

            response.forEach(board=>{
                board.register = new this.DateFormat(board.register).dateformat()
            })
            console.log('forEachData ::: ', response)
            
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