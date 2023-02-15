import request from '/js/lib/request.js'

const template = ({ content, nickname, register, commentidx, image }) => `
<div id="depth_b" data-commentidx="${commentidx}">
<div id="depth_info">
    <img src="https://i.postimg.cc/zXBGP9w1/Ellipse-4.png">
    <div>
        <div>
            <img src="https://i.postimg.cc/qv5KM7Fv/Vector-1.png"><span id='depth_nic'>${nickname}</span>
        </div>
        <div>    
            <img src="https://i.postimg.cc/P5gBGFcx/Vector-4.png"><span>${register}</span>
        </div>
    </div>
</div>
<textarea readonly="readonly">${content}</textarea>
<div id="btn">
    <div id="depth_delete">삭제하기</div>
    <div id="depth_put">수정하기</div>
    <div id='depth_clear'>완료</div>
</div>
</div>
 `;


const commentBox = document.querySelector("#comment_depth")
// console.log(commentBox)


const render = async ({ boardidx }) => {
    
    // 게시글의 전체댓글
    const response = await request.get(`/comments?boardidx=${boardidx}`)
    commentBox.innerHTML = ''
    for (let i = 0; i < response.data.length; i++) {
        // console.log("################",response.data)
        commentBox.innerHTML += template(response.data[i])
    }


    // 댓글삭제
    const deltbtn = document.querySelectorAll('#depth_delete')
    const comment = document.querySelectorAll('#comment_depth > #depth_b')
    // const deltbtn = document.querySelectorAll('#depth_delete')
    
    const deltbtnHandler = (i) => {
        return async (e) => {
            e.preventDefault()

            const {commentidx} = comment[i].dataset
            console.log("commentidx ::: ",commentidx)
            console.log('boardidx ::: ', boardidx)
        
            const response = await request.delete(`/comments?boardidx=${boardidx}&commentidx=${commentidx}`)
            console.log("response :::::: ",response)
            // commentBox.innerHTML -= template(response)
        }
    }

    for (let i =0; i < comment.length; i++){
        deltbtn[i].addEventListener("click", deltbtnHandler(i))
    }

    //////////////////////////////////////////////////////
    // 댓글 수정
    const putbtn = document.querySelectorAll('#depth_put')
    const putbtnHandler = (i) => {
        return async (e) => {
            e.preventDefault()
            
            const {commentidx} = comment[i].dataset
            // console.log('commentidx ::: ', commentidx)
            // console.log('boardidx ::: ', boardidx)

            const putcontent = document.querySelectorAll('textarea')
            for(let i = 0; i < comment.length; i++){
                putcontent[i].readOnly = false
            } 
        }
    }

    for(let i = 0; i < comment.length; i++){
        putbtn[i].addEventListener('click', putbtnHandler(i))
    }



    return response
}

const boardidx = location.href.split('/')
// console.log(boardidx)
render({boardidx:boardidx[boardidx.length-1]})


// 댓글 작성
document.querySelector("#depth_post").addEventListener('click', async (e) => {
    e.preventDefault()

    // console.log(boardidx)
    // console.log(boardidx[4])
    // console.log("nickname :::::::: ",nickname.innerHTML)
    
    const content = document.querySelector('textarea').value
    // console.log("content ::: ", content)

    const data = {
        boardidx: boardidx[4],
        nickname: nickname.innerHTML,
        content,
    }

    const response = await request.post(`/comments?boardidx=${boardidx.value}`, data)
    // console.log("Response ::: ",response)
    // console.log('==================', response.data)
    commentBox.innerHTML += template(response.data)
})

