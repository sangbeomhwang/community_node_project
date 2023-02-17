import request from "/js/lib/request.js";

const myPageBoardTemplate = ({
  boardidx,
  mainidx,
  subidx,
  register,
  title,
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
  return `
    <li data-boardidx="${boardidx}">
        <span>${mainCat[mainidx]}</span>
        <span>${subCat[mainCat[mainidx]][subidx]}</span>
        <span>${title}</span>
        <span>${register}</span>
    </li>
    `;
};

const myPageCommentTemplate = ({ commentidx, boardidx, register, content }) => {
  return `
      <li data-commentidx="${commentidx}">
          <span>${boardidx}번</span>
          <span>게시글</span>
          <span>${content}</span>
          <span>${register}</span>
      </li>
      `;
};

const myPageLikeTemplate = ({ boardidx, mainidx, subidx, register, title }) => {
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
  return `
      <li data-boardidx="${boardidx}">
          <span>${mainCat[mainidx]}</span>
          <span>${subCat[mainCat[mainidx]][subidx]}</span>
          <span>${title}</span>
          <span>${register}</span>
      </li>
      `;
};

const board = document.querySelector("#btn_board");
const boardbox = document.querySelector("#contents_body > ul");
const comment = document.querySelector("#btn_comment");
const like = document.querySelector("#btn_like");
const token = document.cookie.split("=")[1];
const total_board = document.querySelector("#total_board");
const total_comment = document.querySelector("#total_comment");
const total_like = document.querySelector("#total_like");

const count = await request.get("/users/count", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

total_board.innerHTML = count.data.boards;
total_comment.innerHTML = count.data.comments;
total_like.innerHTML = count.data.likes;

const boardHandler = async () => {
  const response = await request.get("/users/details?post=boards", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  boardbox.innerHTML = "";
  for (let i = 0; i < response.data.length; i++) {
    boardbox.innerHTML += myPageBoardTemplate(response.data[i]);
  }
};

const commentHandler = async () => {
  const response = await request.get("/users/details?post=comments", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  boardbox.innerHTML = "";
  for (let i = 0; i < response.data.length; i++) {
    boardbox.innerHTML += myPageCommentTemplate(response.data[i]);
  }
};

const likeHandler = async () => {
  const response = await request.get("/users/details?post=likes", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  boardbox.innerHTML = "";
  for (let i = 0; i < response.data.length; i++) {
    boardbox.innerHTML += myPageLikeTemplate(response.data[i]);
  }
};

board.addEventListener("click", boardHandler);
comment.addEventListener("click", commentHandler);
like.addEventListener("click", likeHandler);
