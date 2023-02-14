import request from '/js/lib/request.js'

const template = ({ boardidx, content, nickname, register, commentidx, image }) => `
<div id="depth_b" data-commentidx="${commentidx}">
<div id="depth_info">
    <img src="https://i.postimg.cc/qv5KM7Fv/Vector-1.png">
    <div>
        <div>
            <img src="https://i.postimg.cc/qv5KM7Fv/Vector-1.png"><span id='depth_nic'>${nickname}</span>
        </div>
        <div>    
            <img src="https://i.postimg.cc/P5gBGFcx/Vector-4.png"><span>2023-02-02</span>
        </div>
    </div>
</div>
<textarea>${content}</textarea>
<div id="btn">
    <div id="depth_delete">삭제하기</div>
    <div id="depth_put">수정하기</div>
</div>
</div>
 `;


const commentBox = document.querySelector("#comment_depth")
// console.log(commentBox)

const render = async ({ boardidx }) => {
    console.log("boardidx ::::",boardidx)
    const response = await request.get(`/comments?boardidx=${boardidx}`)
    console.log('Commentdata :::',response.data)

    // console.log(commentBox)
    commentBox.innerHTML = ''
    for (let i = 0; i < response.data.length; i++) {
        // console.log("################",response.data)
        commentBox.innerHTML += template(response.data[i])
    }
    return response
}

const boardidx = location.href.split('/')
// console.log(boardidx)
render({boardidx:boardidx[boardidx.length-1]})


document.querySelector("#depth_post").addEventListener('click', async (e) => {
    e.preventDefault()

    console.log(boardidx)
    console.log(boardidx[4])
    console.log("nickname :::::::: ",nickname.innerHTML)
    
    const content = document.querySelector('textarea').value
    console.log("content ::: ", content)

    const data = {
        boardidx: boardidx[4],
        nickname: nickname.innerHTML,
        content,
    }

    console.log("=================",data)

    const response = await request.post(`/comments?boardidx=${boardidx.value}`, data)
    console.log("Response ::: ",response)
    console.log('==================', response.data)
    commentBox.innerHTML += template(response.data)
})