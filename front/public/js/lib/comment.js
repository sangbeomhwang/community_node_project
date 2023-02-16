import request from "/js/lib/request.js";

const template = ({ content, nickname, register, commentidx, image }) => `
<div id="depth_b" data-commentidx="${commentidx}">
<div id="depth_info">
    <img src="https://i.postimg.cc/zXBGP9w1/Ellipse-4.png">
    <div>
        <div>
            <img src="https://i.postimg.cc/qv5KM7Fv/Vector-1.png"><span id='depth_nic'>${nickname}</span>
        </div>
        <div>    
            <img src="https://i.postimg.cc/P5gBGFcx/Vector-4.png"><span id='depth_date'>${register}</span>
        </div>
    </div>
</div>
<textarea readonly="readonly">${content}</textarea>
 `;

const commentBox = document.querySelector("#comment_depth");
// console.log(commentBox)

const render = async ({ boardidx }) => {
    // 게시글의 전체댓글
    const response = await request.get(`/comments?boardidx=${boardidx}`)
    // console.log('===============', response.data[1].nickname)
    commentBox.innerHTML = ''
    const {usernick} = document.querySelector('[data-usernick]').dataset
    // console.log(usernick)
    for (let i = 0; i < response.data.length; i++) {
        if(response.data[i].nickname !== usernick){
            commentBox.innerHTML += template(response.data[i]) + '</div>'

        } else {
            commentBox.innerHTML += template(response.data[i]) + '<div id="btn"><div id="depth_delete">삭제하기</div><div id="depth_put">수정하기</div><div id="depth_clear">완료</div></div></div>'

        }
            
    }
    
      
    
    // 댓글삭제
    const deltbtn = document.querySelectorAll('#depth_delete')
    console.log(deltbtn)
    const comment = document.querySelectorAll('#comment_depth > #depth_b')
    console.log(comment)

    // const deltbtn = document.querySelectorAll('#depth_delete')
    
    //////////////////////////////////////////////////////
    const deltbtnHandler = (i) => {
        return async (e) => {
            e.preventDefault()

            const {commentidx} = comment[i].dataset
            console.log("commentidx ::: ",commentidx)
            console.log('boardidx ::: ', boardidx)
        
            const response = await request.delete(`/comments?boardidx=${boardidx}&commentidx=${commentidx}`)
            console.log("response :::::: ",response)
            // commentBox.innerHTML -= template(response)

            location.href = `http://localhost:3005/boards/${boardidx}`
        }
    }

    for (let i =0; i < deltbtn.length; i++){
        deltbtn[i].addEventListener("click", deltbtnHandler(i))
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
    console.log(putbtn)
    for(let i = 0; i < putbtn.length; i++){
        putbtn[i].addEventListener('click', putbtnHandler(i))
    }


    //////////////////////////////////////////////
    // 댓글 수정완료 버튼
    const clearbtnHandler = (i) => {
        return async (e) => {
            e.preventDefault()

            console.log(e.target.parentNode.previousElementSibling)
            const textarea = document.querySelectorAll('textarea')
            // console.log(content[i + 1].value)
            const content = textarea[i + 1].value
            // console.log(boardidx)
            // console.log(commentidx)
            const {commentidx} = comment[i].dataset
            console.log("commentidx ::: ",commentidx)

            const data = {
                boardidx,
                nickname: nickname.innerHTML,
                content,
                
            }
            console.log(data)

            const response = await request.put(`/comments?boardidx=${boardidx}&commentidx=${commentidx}`, data)
            console.log(response)
            e.target.parentNode.previousElementSibling.readOnly = true
            e.target.style.display = 'none'
            putbtn[i].style.display = 'block'
        }
    }

    for(let i = 0; i < postbtn.length; i++){
        postbtn[i].addEventListener('click', clearbtnHandler(i))
    }

    return response
}

const boardidx = location.href.split('/')
// console.log(boardidx)

// 댓글 작성
document.querySelector("#depth_post").addEventListener("click", async (e) => {
  e.preventDefault();

  // console.log(boardidx)
  // console.log(boardidx[4])
  // console.log("nickname :::::::: ",nickname.innerHTML)

  const content = document.querySelector("textarea").value;
  // console.log("content ::: ", content)
  // console.log(nickname)
  // console.log(commentidx)

  // console.log(document.querySelector('[data-usernick]').dataset)
  const { usernick } = document.querySelector("[data-usernick]").dataset;
  // console.log(usernick)

  // console.log(document.querySelector('#depth_date').textContent)
  // const regit = document.querySelector('#depth_date').textContent
  // console.log(">>>>>>>>>>>>>>>>>>>",regit)

  const data = {
    boardidx: boardidx[4],
    nickname: usernick,
    content,
    register,
  };
  console.log(data);

  const response = await request.post(
    `/comments?boardidx=${boardidx.value}`,
    data
  );
  // console.log("Response ::: ",response)
  console.log("==================", response.data);
  commentBox.innerHTML += template(response.data);
});

render({ boardidx: boardidx[boardidx.length - 1] });
