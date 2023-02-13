import request from "/js/lib/request.js";
import { getCategory, categoryTitleRender } from "/js/lib/getCategory.js";

const modifyBtn = (boardidx) => () => {
  location.href = `/boards/modify?boardidx=${boardidx}`;
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

const backBtn = () => {
  window.history.back();
};

const init = async () => {
  const { usernick } = document.querySelector("#usernick").dataset;
  const title = document.querySelector("#write_subject");
  const nickname = document.querySelector("#nickname");
  const register = document.querySelector("#register");
  const hit = document.querySelector("#hit");
  const content = document.querySelector("#write_content");
  const modify = document.querySelector("#modify");
  const back = document.querySelector("#back");
  const boardidx = document.querySelector("#boardidx").value;

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
  content.innerHTML = data.content;

  console.log(data);
  console.log(usernick);

  modify.addEventListener("click", modifyBtn(boardidx));
  back.addEventListener("click", backBtn);
};

init();
