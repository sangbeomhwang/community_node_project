// import request from "/js/lib/request.js";

const myPageBoardTemplate = ({
  boardidx,
  mainidx,
  subidx,
  register,
  title,
}) => {
  return `
    <li data-boardidx="${boardidx}">
        <span>${mainidx}</span>
        <span>${subidx}</span>
        <span>${title}</span>
        <span>${register}</span>
    </li>
    `;
};

const myPageCommentTemplate = ({
  commentidx,
  mainidx,
  subidx,
  register,
  content,
}) => {
  return `
      <li data-commentidx="${commentidx}">
          <span>${mainidx}</span>
          <span>${subidx}</span>
          <span>${content}</span>
          <span>${register}</span>
      </li>
      `;
};

const board = document.querySelector("#btn_board");
const boardbox = document.querySelector("#contents_body > ul");
const comment = document.querySelector("#btn_comment");
const like = document.querySelector("#btn_like");

const boardHandler = async ({ nickname }) => {
  const response = await request.get(`/users/details?nickname=${nickname}`, {
    headers: {
      Authorization: "Bearer",
    },
  });
  for (let i = 0; i > response.data.length; i++) {
    boardbox.innerHTML += myPageTemplate(response.data[i]);
  }
  console.log("hi");
};

const commentHandler = async () => {};
const likeHandler = async () => {};

board.addEventListener("click", boardHandler);
comment.addEventListener("click", commentHandler);
like.addEventListener("click", likeHandler);
