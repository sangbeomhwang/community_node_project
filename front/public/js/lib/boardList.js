const adminBoardListTemplate = ({
  image,
  boardidx,
  nickname,
  register,
  title,
  hit,
  mainidx,
  subidx,
  visible
}) => {
  const mainCat = {
0:"Q&A",
1:"커뮤니티",
2:"공지사항"
  }

  const subCat = {
    "Q&A" : {
      0: "레시피",
      1: "조리도구"
    },
    "커뮤니티" : {
      0:"일상이야기",
      1: "모임"
    },
    "공지사항" : {
      0: "Q&A",
      1: "커뮤니티"
    }
  }
  // console.log(subCat["공지사항"])
  // console.log(subCat[mainCat[2]])
  return `
<li>
  <ul>
    <li class="users_info">
      <img src="${image}" />
    </li>
    <li class="users_info">${boardidx}</li>
    <li class="users_info">${nickname}</li>
    <li class="users_info" id="title_length">${title}</li>
    <li class="users_info">${register}</li>
    <li class="users_info">${hit}</li>
    <li class="users_info">
      <div id="category">
        <input type="text" id="levelBox" name="level" value="${mainCat[mainidx]}" readonly/>
        <input type="text" id="accessBox" name="access" value="${subCat[mainCat[mainidx]][subidx]}" readonly/>
      </div>
      <form action="/admins/boardModify/${boardidx}" method="post">
          <input type="text" id="visibleBox" name="visible" value="${visible}" />
          <button class="modify_item" type="submit">수정완료</button>
      </form>
    </li>
  </ul>
</li>
`;
};

export { adminBoardListTemplate };

// import request from "/js/lib/request.js";

// const boardListTemplate = ({ image, userid, title, register, hit }) => {
//   return `
// <li>
//   <ul>
//     <li class="users_info">
//       <img src="${image}" />
//     </li>
//     <li class="users_info">boardIdx</li>
//     <li class="users_info">${userid}</li>
//     <li class="users_info">${title}</li>
//     <li class="users_info">${register}</li>
//     <li class="users_info">${hit}</li>
//     <li class="users_info">
//       <img src="https://i.postimg.cc/fTCt8QGZ/Vector-1.png" />
//     </li>
//   </ul>
// </li>
// `;
// };

// const boardListBox = document.querySelector("#allusers_body > ul");
// // console.log(boardListBox);

// const render = async () => {
//   const response = await request.get(`/admins/boardlist`);
//   const boardList = response.data.response;
//   // console.log("response :::", boardList);

//   boardListBox.innerHTML = "";

//   for (let i = 0; i < boardList.length; i++) {
//     // console.log("################", boardList);
//     boardListBox.innerHTML += boardListTemplate(boardList[i]);
//   }

//   const default_img = document.querySelectorAll(
//     "#allusers_body > ul > li > ul > li > img"
//   );

//   console.log(default_img);

//   for (let i = 0; i < default_img.length; i++) {
//     // profile image에 아직 어떠한 이미지도 따로 지정하지 않은 경우에는 기본 profile image를 적용해주는 코드
//     if (default_img[i].src === "http://127.0.0.1:3000/undefined") {
//       default_img[i].src =
//         "https://cdn-icons-png.flaticon.com/512/64/64572.png";
//     }
//   }

//   // console.log("check $$$$ : ", boardListBox);
//   return response;
// };

// render();
