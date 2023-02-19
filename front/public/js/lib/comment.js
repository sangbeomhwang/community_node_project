import request from "/js/lib/request.js";

const template = (data) => {
  if (data.User.image.length === 0) {
    data.User.image = "/img/profile_img.png";
  }
  return `
<div id="depth_b" data-commentidx="${data.commentidx}">
<div id="depth_info">
<img src="${data.User.image}">
    <div>
        <div>
            <img src="/img/users.png"><span id='depth_nic'>${data.nickname}</span>
        </div>
        <div>
            <img src="/img/date.png"><span id='depth_date'>${data.register}</span>
        </div>
    </div>
</div>
<textarea readonly="readonly">${data.content}</textarea>
 `;
};

const commentBox = document.querySelector("#comment_depth");

const render = async ({ boardidx }) => {
  // 게시글의 전체댓글
  const { data } = await request.get(`/comments?boardidx=${boardidx}`);

  const count = document.querySelector("#comment_body > h1 > span");
  count.innerHTML = data.userCount;

  commentBox.innerHTML = "";
  const { usernick } = document.querySelector("[data-usernick]").dataset;
  for (let i = 0; i < data.response.length; i++) {
    console.log(i);
    if (data.response[i].nickname !== usernick) {
      commentBox.innerHTML += template(data.response[i]) + "</div>";
    } else {
      commentBox.innerHTML += template(data.response[i]) + '<div id="btn"><div id="depth_delete">삭제하기</div><div id="depth_put">수정하기</div><div id="depth_clear">완료</div></div></div>';
    }
  }

  const postbtn = document.querySelectorAll("#depth_clear");
  // 댓글 수정
  const putbtnHandler = (i) => {
    return async (e) => {
      e.preventDefault();

      e.target.style.display = "none";
      postbtn[i].style.display = "block";

      e.target.parentNode.previousElementSibling.readOnly = false;
    };
  };

  const putbtn = document.querySelectorAll("#depth_put");
  for (let i = 0; i < putbtn.length; i++) {
    putbtn[i].addEventListener("click", putbtnHandler(i));
  }

  // 댓글 수정완료 버튼
  const clearbtnHandler = (i) => {
    return async (e) => {
      e.preventDefault();

      const textarea = document.querySelectorAll("textarea");
      const content = textarea[i + 1].value;
      const { commentidx } = comment[i].dataset;

      const data = {
        boardidx,
        nickname: nickname.innerHTML,
        content,
      };

      await request.put(`/comments?boardidx=${boardidx}&commentidx=${commentidx}`, data);
      e.target.parentNode.previousElementSibling.readOnly = true;
      e.target.style.display = "none";
      putbtn[i].style.display = "block";
    };
  };

  for (let i = 0; i < postbtn.length; i++) {
    postbtn[i].addEventListener("click", clearbtnHandler(i));
  }

  // 댓글삭제
  const deltbtn = document.querySelectorAll("#depth_delete");
  const comment = document.querySelectorAll("#comment_depth > #depth_b");

  const deltbtnHandler = (i) => {
    return async (e) => {
      e.preventDefault();
      const { commentidx } = e.target.parentNode.parentNode.dataset;
      await request.delete(`/comments?boardidx=${boardidx}&commentidx=${commentidx}`);
      location.href = `/boards/${boardidx}`;
    };
  };

  for (let i = 0; i < deltbtn.length; i++) {
    deltbtn[i].addEventListener("click", deltbtnHandler(i));
  }

  return data;
};

const boardidx = location.href.split("/");

// 댓글 작성
document.querySelector("#depth_post").addEventListener("click", async (e) => {
  e.preventDefault();

  const content = document.querySelector("textarea").value;
  const { usernick } = document.querySelector("[data-usernick]").dataset;
  const writer = document.querySelector("#nickname").innerText;

  const { userimage } = document.querySelector("[data-userimage]").dataset;

  const datacontent = {
    boardidx: boardidx[4],
    nickname: usernick,
    writer,
    content,
  };

  const { data } = await request.post(`/comments?boardidx=${boardidx.value}`, datacontent);
  data.User = { image: userimage };

  commentBox.innerHTML += template(data) + '<div id="btn"><div id="depth_delete">삭제하기</div><div id="depth_put">수정하기</div><div id="depth_clear">완료</div></div></div>';

  const default_img = document.querySelectorAll("#depth_b > #depth_info > img");
  const server = document.querySelector("#server").value;

  for (let i = 0; i < default_img.length; i++) {
    // profile image에 아직 어떠한 이미지도 따로 지정하지 않은 경우에는 기본 profile image를 적용해주는 코드
    if (default_img[i].src.indexOf(`${server}`) === -1 && default_img[i].src.indexOf("http://k.kakaocdn.net") === -1) {
      default_img[i].src = "/img/profile_img.png";
    }
  }

  location.href = `/boards/${data.boardidx}`;
});

render({ boardidx: boardidx[boardidx.length - 1] });
