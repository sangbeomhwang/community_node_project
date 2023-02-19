const adminBoardListTemplate = ({ image, boardidx, nickname, register, title, hit, mainidx, subidx, visible }) => {
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
