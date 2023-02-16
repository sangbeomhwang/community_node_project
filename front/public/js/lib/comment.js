import request from '/js/lib/request.js'

// const template = ({ content, nickname, register, commentidx, image }) => `
const template = (data) => { 
if (data.User.image.length === 0) {
    data.User.image = "https://cdn-icons-png.flaticon.com/512/64/64572.png"
}
return`
<div id="depth_b" data-commentidx="${data.commentidx}">
<div id="depth_info">
<img src="${data.User.image}">
    <div>
        <div>
            <img src="https://i.postimg.cc/qv5KM7Fv/Vector-1.png"><span id='depth_nic'>${data.nickname}</span>
        </div>
        <div>
            <img src="https://i.postimg.cc/P5gBGFcx/Vector-4.png"><span id='depth_date'>${data.register}</span>
        </div>
    </div>
</div>
<textarea readonly="readonly">${data.content}</textarea>
 `;
}

const commentBox = document.querySelector("#comment_depth")
// console.log(commentBox)


const render = async ({ boardidx }) => {
    
    // 게시글의 전체댓글
    const {data} = await request.get(`/comments?boardidx=${boardidx}`)
    console.log("render__data ::::::",data)
    // console.log('===============', response.data[1].nickname)
    commentBox.innerHTML = ''
    const {usernick} = document.querySelector('[data-usernick]').dataset
    // console.log(usernick)
    for (let i = 0; i < data.length; i++) {
        
        if(data[i].nickname !== usernick){
            commentBox.innerHTML += template(data[i]) + '</div>'

        } else {
            commentBox.innerHTML += template(data[i]) + '<div id="btn"><div id="depth_delete">삭제하기</div><div id="depth_put">수정하기</div><div id="depth_clear">완료</div></div></div>'

        }
            
    }
       
    
    const postbtn = document.querySelectorAll('#depth_clear')
    // 댓글 수정
    const putbtnHandler = (i) => {
        return async (e) => {
            e.preventDefault()
            
            // console.dir(e.target)
            e.target.style.display = 'none'
            postbtn[i].style.display = 'block'
            
            // const putcontent = document.querySelectorAll('textarea')
            // console.log(putcontent[i+1])
            // putcontent[i + 1].readOnly = false
            e.target.parentNode.previousElementSibling.readOnly = false
            
        }
    }
    
    // console.log(putbtn)
    const putbtn = document.querySelectorAll('#depth_put')
    // console.log(putbtn)
    for(let i = 0; i < putbtn.length; i++){
        putbtn[i].addEventListener('click', putbtnHandler(i))
    }


    //////////////////////////////////////////////
    // 댓글 수정완료 버튼
    const clearbtnHandler = (i) => {
        return async (e) => {
            e.preventDefault()

            // console.log(e.target.parentNode.previousElementSibling)
            const textarea = document.querySelectorAll('textarea')
            // console.log(content[i + 1].value)
            const content = textarea[i + 1].value
            // console.log(boardidx)
            // console.log(commentidx)
            const {commentidx} = comment[i].dataset
            // console.log("commentidx ::: ",commentidx)

            const data = {
                boardidx,
                nickname: nickname.innerHTML,
                content,
                
            }
            // console.log(data)

            const response = await request.put(`/comments?boardidx=${boardidx}&commentidx=${commentidx}`, data)
            // console.log(response)
            e.target.parentNode.previousElementSibling.readOnly = true
            e.target.style.display = 'none'
            putbtn[i].style.display = 'block'
        }
    }

    for(let i = 0; i < postbtn.length; i++){
        postbtn[i].addEventListener('click', clearbtnHandler(i))
    }



    // 댓글삭제
    const deltbtn = document.querySelectorAll('#depth_delete')
    const comment = document.querySelectorAll('#comment_depth > #depth_b')
    
    
    const deltbtnHandler = (i) => {
        return async (e) => {
            e.preventDefault()
            const {commentidx} = e.target.parentNode.parentNode.dataset            
            const response = await request.delete(`/comments?boardidx=${boardidx}&commentidx=${commentidx}`)
            location.href = `http://localhost:3005/boards/${boardidx}`
        }
    }

    for (let i =0; i < deltbtn.length; i++){
        deltbtn[i].addEventListener("click", deltbtnHandler(i))
    }


    return data
}

const boardidx = location.href.split('/')
    // console.log(boardidx)
    
    // 댓글 작성
    document.querySelector("#depth_post").addEventListener('click', async (e) => {
        e.preventDefault()
    
        // console.log(boardidx)
        // console.log(boardidx[4])
        // console.log("nickname :::::::: ",nickname.innerHTML)
        
        const content = document.querySelector('textarea').value
        // console.log("content ::: ", content)
        // console.log(nickname)
        // console.log(commentidx)
    
        // console.log(document.querySelector('[data-usernick]').dataset)
        const {usernick} = document.querySelector('[data-usernick]').dataset
        // console.log(usernick)
    
        // console.log(document.querySelector('#depth_date').textContent)
        // const regit = document.querySelector('#depth_date').textContent
        // console.log(">>>>>>>>>>>>>>>>>>>",regit)

        const {userimage} = document.querySelector('[data-userimage]').dataset
        console.log(userimage)
    
        const datacontent = {
            boardidx: boardidx[4],
            nickname: usernick,
            content,
            
        }
        // console.log(data)
    
        
    
        const {data} = await request.post(`/comments?boardidx=${boardidx.value}`, datacontent)
        data.User = {image: userimage}
        console.log('post__data::::',data)

        commentBox.innerHTML += template(data) + '<div id="btn"><div id="depth_delete">삭제하기</div><div id="depth_put">수정하기</div><div id="depth_clear">완료</div></div></div>'
        // deltbtn.addEventListener("click", deltbtnHandler)

        const default_img = document.querySelectorAll(
            "#depth_b > #depth_info > img"
          );
        
          console.log(default_img);
        
          for (let i = 0; i < default_img.length; i++) {
            // profile image에 아직 어떠한 이미지도 따로 지정하지 않은 경우에는 기본 profile image를 적용해주는 코드
            if (
              default_img[i].src.indexOf("http://127.0.0.1:3000/") === -1 &&
              default_img[i].src.indexOf("http://k.kakaocdn.net") === -1
            ) {
              default_img[i].src =
                "https://cdn-icons-png.flaticon.com/512/64/64572.png";
            }
          }

        location.href = `/boards/${data.boardidx}`

        
    })



render({boardidx:boardidx[boardidx.length-1]})