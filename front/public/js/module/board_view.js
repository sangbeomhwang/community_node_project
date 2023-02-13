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

const backBtn = (mainidx) => {
  return () => {
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

const init = async () => {
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
  
  hashtag(data.hash);


  modify.addEventListener("click", modifyBtn(boardidx));
  back.addEventListener("click", backBtn(mainidx));
};

init();
