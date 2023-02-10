import request from "/js/lib/request.js";
import { getCategory, categoryTitleRender } from "/js/lib/getCategory.js";
const queryString = new URLSearchParams(location.search);

const editor = document.querySelector("#editor");

const focusEditor = () => {
  editor.focus({ preventScroll: true });
};

const imgBtnHandler = async (e) => {
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

  const response = await request.post("/boards", data);
  location.href = `/boards/${response.data.boardidx}`;
};

const init = async () => {
  const mainidx = queryString.get("mainidx");
  const subCategories = document.querySelector("#subcategories");
  const [categories] = (await getCategory({ mainidx })).data;
  categoryTitleRender({ categories, all: false });

  subCategories.addEventListener("click", subCatHandler);

  const imgBtn = document.querySelector("#img");
  imgBtn.addEventListener("change", imgBtnHandler);
  const writeBtn = document.querySelector("#write_form");
  writeBtn.addEventListener("submit", writeHandler);
};

init();
