import request from "/js/lib/request.js";
import { getCategory, categoryTitleRender } from "/js/lib/getCategory.js";

const modifyBtn = (boardidx) => () => {
  location.href = `/boards/modify/${boardidx}`;
};

const subCat = (subCatIdx) => {
  const subCategories = document.querySelectorAll("[data-subidx");
  for (let i = 0; i < subCategories.length; i++) {
    subCategories[i].classList.remove("cat_active");
    if (subCategories[i].dataset.subidx === String(subCatIdx)) {
      subCategories[i].classList.add("cat_active");
    }
  }
};

const deleteBtnHandler = ({ mainidx, boardidx }) => {
  return async () => {
    await request.delete(`/boards/${boardidx}`);
    location.href = `/boards?mainidx=${mainidx}`;
  };
};

const hashtag = (hash) => {
  const hashbox = document.querySelector("#write_hashbox");
  hashbox.innerText = "";
  for (let i = 0; i < hash.length; i++) {
    const div = document.createElement("div");
    div.className = "hash";
    const span = document.createElement("span");
    span.innerText = "#" + hash[i];
    div.appendChild(span);
    hashbox.appendChild(div);
  }
};
const likeInit = async ({ boardidx, usernick }) => {
  const like = document.querySelector("#like");
  const { data } = await request.get(`/likes?boardidx=${boardidx}&nickname=${usernick}`);
  if (data) like.classList.add("like_active");
};

const likeCount = (count) => {
  const like = document.querySelector("#like > span");
  like.innerText = count;
};

const likeClick = (clicked) => {
  const like = document.querySelector("#like");
  if (!clicked) return like.classList.remove("like_active");
  like.classList.add("like_active");
};

const likeBtnHandler = async () => {
  const boardidx = document.querySelector("#boardidx").value;
  const { usernick } = document.querySelector("#usernick").dataset;
  const { count, clicked } = (await request.put(`/likes?boardidx=${boardidx}&nickname=${usernick}`)).data;
  likeCount(count);
  likeClick(clicked);
};

const init = async () => {
  const title = document.querySelector("#write_subject");
  const nickname = document.querySelector("#nickname");
  const register = document.querySelector("#register");
  const hit = document.querySelector("#hit");
  const like = document.querySelector("#like > span");
  const content = document.querySelector("#write_content");
  const likeBtn = document.querySelector("#like");
  const modify = document.querySelector("#modify");
  const deleteBtn = document.querySelector("#delete");
  const boardidx = document.querySelector("#boardidx").value;
  const { usernick } = document.querySelector("#usernick").dataset;

  const { data } = await request.get(`/boards/${boardidx}`);
  const mainidx = data.mainidx;
  const subidx = data.subidx;
  const [categories] = (await getCategory({ mainidx })).data;
  categoryTitleRender({ categories, all: false });
  subCat(subidx);
  title.innerText = data.title;
  nickname.innerText = data.nickname;
  register.innerText = data.register;
  hit.innerText = data.hit;
  like.innerText = data.like;
  content.innerHTML = data.content;
  likeInit({ boardidx, usernick });
  hashtag(data.hash);

  modify.style = "display: none";
  deleteBtn.style = "display: none";

  if (usernick === data.nickname) {
    modify.style = "display: inline-block";
    modify.addEventListener("click", modifyBtn(boardidx));
    deleteBtn.style = "display: inline-block";
    deleteBtn.addEventListener("click", deleteBtnHandler({ mainidx, boardidx }));
  }

  if (usernick !== data.nickname) {
    likeBtn.addEventListener("click", likeBtnHandler);
    await request.get(`/boards/hits?boardidx=${boardidx}`);
    hit.innerText = Number(hit.innerText) + 1;
  }
};

init();
