const adminBoardListTemplate = ({
  image,
  boardidx,
  nickname,
  register,
  title,
  hit,
  mainidx,
  subidx,
  visible,
}) => {
  const mainCat = {
    0: "Q&A",
    1: "커뮤니티",
    2: "공지사항",
  };

  const subCat = {
    "Q&A": {
      0: "레시피",
      1: "조리도구",
    },
    커뮤니티: {
      0: "일상이야기",
      1: "모임",
    },
    공지사항: {
      0: "Q&A",
      1: "커뮤니티",
    },
  };
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
        <input type="text" id="levelBox" name="level" value="${
          mainCat[mainidx]
        }" readonly/>
        <input type="text" id="accessBox" name="access" value="${
          subCat[mainCat[mainidx]][subidx]
        }" readonly/>
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

// const boardListBox = document.querySelector("#allusers_body > ul");
// // console.log(userListBox);

// const render = async () => {
//   const response = await request.get(`/admins/boardlist`);
//   const boardList = response.data.response;
//   // console.log("response :::", boardList);

//   boardListBox.innerHTML = "";

//   for (let i = 0; i < boardList.length; i++) {
//     boardListBox.innerHTML += adminBoardListTemplate(boardList[i]);
//   }

//   const default_img = document.querySelectorAll(
//     "#allusers_body > ul > li > ul > li > img"
//   );

//   const server = document.querySelector("#server").value;
//   for (let i = 0; i < default_img.length; i++) {
//     // profile image에 아직 어떠한 이미지도 따로 지정하지 않은 경우에는 기본 profile image를 적용해주는 코드
//     if (default_img[i].src.indexOf(`${server}`) === -1) {
//       default_img[i].src =
//         "https://cdn-icons-png.flaticon.com/512/64/64572.png";
//     }
//     if (default_img[i].src.indexOf("undefined") !== -1) {
//       default_img[i].src =
//         "https://cdn-icons-png.flaticon.com/512/64/64572.png";
//     }
//   }

//   const title_content = document.querySelectorAll(
//     "#allusers_body > ul > li > ul > #title_length"
//   );

//   for (let i = 0; i < title_content.length; i++) {
//     const default_len = 28;
//     const last_text = "...";

//     if (title_content[i].textContent.length > default_len) {
//       title_content[i].textContent =
//         title_content[i].textContent.substring(0, default_len) + last_text;
//     }
//   }

//   // console.log("check $$$$ : ", userListBox);
//   return response;
// };

// render();
