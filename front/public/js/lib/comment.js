import request from '/js/lib/request.js'

const template = ({ boardidx, content, nickname, register, commentidx }) => `
<div id="depth_b" data-commentidx="${commentidx}">
<div id="depth_info">
    <img src="https://i.postimg.cc/zXBGP9w1/Ellipse-4.png">
    <div>
        <div>
            <img src="https://i.postimg.cc/qv5KM7Fv/Vector-1.png"><span>${nickname}</span>
        </div>
        <div>    
            <img src="https://i.postimg.cc/P5gBGFcx/Vector-4.png"><span>2023-02-02</span>
        </div>
    </div>
</div>
<textarea>${content}</textarea>
<div id="btn">
    <div id="depth_post">댓글쓰기</div>
</div>
</div>
 `;


const commentBox = document.querySelector("#comment_depth")
console.log(commentBox)
const render = async ({ boardidx }) => {
    console.log("boardidx ::::",boardidx)
    const response = await request.get(`/comments?boardidx=${boardidx}`)
    console.log('Commentdata :::',response.data)

    console.log(commentBox)
    commentBox.innerHTML = ''
    for (let i = 0; i < response.data.length; i++) {
        console.log("################",response.data)
        commentBox.innerHTML += template(response.data[i])
    }
    return response
}

const boardidx = location.href.split('/')
// console.log(boardidx)
render({boardidx:boardidx[boardidx.length-1]})
