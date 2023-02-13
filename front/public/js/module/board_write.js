import request from "/js/lib/request.js";
import { getCategory, categoryTitleRender } from "/js/lib/getCategory.js";
const queryString = new URLSearchParams(location.search);

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
  const uri = "http://localhost:3000/";

  focusEditor();
  document.execCommand("insertImage", false, `${uri}${src}`);
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

const writeHandler = async (e) => {
  e.preventDefault();
  const mainidx = queryString.get("mainidx");
  const { subidx } = document.querySelector(".cat_active[data-subidx]").dataset;

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

  // 글 등록
  const response = await request.post("/boards", data);
  location.href = `/boards/view?mainidx=${mainidx}&boardidx=${response.data.boardidx}`;
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

const init = async () => {
  const mainidx = queryString.get("mainidx");
  const subCategories = document.querySelector("#subcategories");
  const [categories] = (await getCategory({ mainidx })).data;
  categoryTitleRender({ categories, all: false });

  subCategories.addEventListener("click", subCatHandler);

  const imgBtn = document.querySelector("#img");
  imgBtn.addEventListener("change", imgUploadHandler);
  const hashbox = document.querySelector("#write_hashbox");
  hashbox.addEventListener("keypress", hashTagEnterHandler);

  const writeBtn = document.querySelector("#write_form");
  writeBtn.addEventListener("submit", writeHandler);
};

init();
