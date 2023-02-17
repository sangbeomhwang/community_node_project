import request from "/js/lib/request.js";
import { getCategory, categoryTitleRender } from "/js/lib/getCategory.js";

const editor = document.querySelector("#editor");

const focusEditor = () => {
  editor.focus({ preventScroll: true });
};

const imgUploadHandler = async (e) => {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append("file", file);

  const response = await request.post("/boards/img", formData, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });

  const { path } = response.data;
  const temp = path.split("/");
  temp.shift();
  const src = temp.join("/");
  const server = document.querySelector("#server").value;

  focusEditor();
  document.execCommand("insertImage", false, `${server}${src}`);
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

const subCatHandler = (e) => {
  const subCat = document.querySelectorAll("[data-subidx]");
  const { subidx } = e.target.dataset;
  if (!subidx) {
    return;
  }
  for (let i = 0; i < subCat.length; i++) {
    subCat[i].classList.remove("cat_active");
  }
  subCat[subidx].classList.add("cat_active");
};

const addHashTag = (hashTagList) => {
  const hash = [];
  for (let i = 0; i < hashTagList.length - 1; i++) {
    hash.push(hashTagList[i].innerText.split("#")[1]);
  }
  return hash;
};

const writeHandler = async (e) => {
  e.preventDefault();
  const boardidx = document.querySelector("#boardidx").value;
  const { mainidx } = document.querySelectorAll("[data-mainidx]")[0].dataset;
  const { subidx } = document.querySelector(".cat_active[data-subidx]").dataset;
  const hashTags = document.querySelectorAll(".hash > span");

  const {
    title: { value: title },
    nickname: { value: nickname },
  } = e.target;
  const contentBox = document.querySelector("#editor");
  const content = contentBox.innerHTML;

  const data = {
    mainidx,
    subidx,
    title,
    nickname,
    content,
  };

  //   글 등록
  await request.put(`/boards/${boardidx}`, data);

  const hashes = addHashTag(hashTags);

  await request.put("/hashes", { hashes, boardidx });

  location.href = `/boards/${boardidx}`;
};

const hashTagEnterHandler = (e) => {
  if (e.key === "#") {
    e.preventDefault();
  }
  if (e.key === "Enter") {
    const node = e.target.parentElement.parentElement;
    createSpanTag(e.target);
    createHashTag(node);
  }
};

const tagRemove = (e) => {
  e.target.parentElement.remove();
};

const createHashTag = (node) => {
  const div = document.createElement("div");
  const span = document.createElement("span");
  const input = document.createElement("input");
  div.className = "hash";
  span.innerText = "#";
  input.placeholder = "tag를 입력해주세요";
  div.appendChild(span);
  div.appendChild(input);
  node.appendChild(div);
};

const createSpanTag = (inputBox) => {
  const tag = inputBox.value;
  const span = inputBox.previousSibling;
  span.innerText += tag;
  inputBox.remove();
  span.addEventListener("click", tagRemove);
};

const backHandler = () => {
  history.back();
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
    div.addEventListener("click", tagRemove);
  }
  createHashTag(hashbox);
};

const init = async () => {
  const boardidx = document.querySelector("#boardidx").value;
  const title = document.querySelector("#write_subject");
  const nickname = document.querySelector("#nickname");
  const content = document.querySelector("#editor");
  const { data } = await request.get(`/boards/${boardidx}`);

  const mainidx = data.mainidx;
  const subidx = data.subidx;
  const [categories] = (await getCategory({ mainidx })).data;
  categoryTitleRender({ categories, all: false });
  subCat(subidx);

  const subCategories = document.querySelector("#subcategories");
  subCategories.addEventListener("click", subCatHandler);

  const imgBtn = document.querySelector("#img");
  imgBtn.addEventListener("change", imgUploadHandler);

  const hashbox = document.querySelector("#write_hashbox");
  hashbox.addEventListener("keypress", hashTagEnterHandler);

  title.value = data.title;
  nickname.innerText = data.nickname;
  content.innerHTML = data.content;

  hashtag(data.hash);

  const writeBtn = document.querySelector("#write_form");
  writeBtn.addEventListener("submit", writeHandler);

  const backBtn = document.querySelector("#back");
  backBtn.addEventListener("click", backHandler);

  const commandBtn = document.querySelectorAll("[data-command]");
  commandBtn.forEach((el) =>
    el.addEventListener("click", (e) => {
      const element = document.querySelector("[contenteditable]");

      const range = document.createRange();
      range.selectNodeContents(element);
      range.collapse(false);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);

      element.focus();
      const command = el.dataset.command;

      if (command === "p") {
        document.execCommand("formatBlock", false, command);
      } else {
        document.execCommand(command);
      }
    })
  );
};

init();
