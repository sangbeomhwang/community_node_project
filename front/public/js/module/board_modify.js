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
  const uri = "http://localhost:3000/";

  focusEditor();
  document.execCommand("insertImage", false, `${uri}${src}`);
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

const writeHandler = async (e) => {
  e.preventDefault();
  const boardidx = document.querySelector("#boardidx").value;
  const { mainidx } = document.querySelectorAll("[data-mainidx]")[0].dataset;
  const { subidx } = document.querySelector(".cat_active[data-subidx]").dataset;
  console.log(e.target);
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
  location.href = `/boards/${boardidx}`;
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

  title.value = data.title;
  nickname.innerText = data.nickname;
  content.innerHTML = data.content;

  const writeBtn = document.querySelector("#write_form");
  writeBtn.addEventListener("submit", writeHandler);
};

init();
