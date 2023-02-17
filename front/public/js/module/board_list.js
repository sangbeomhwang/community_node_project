import request from "/js/lib/request.js";
import { boardListTemplate } from "/js/lib/template.js";
import { getCategory, categoryTitleRender } from "/js/lib/getCategory.js";
const queryString = new URLSearchParams(location.search);
let sortNow = "DESC";

const render = ({ data }) => {
  const contentBox = document.querySelector("#content_body > ul");
  contentBox.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    contentBox.innerHTML += boardListTemplate(data[i]);
  }
};

const getData = async ({ mainidx, subidx, page, target = "boardidx" }) => {
  const {
    data: { data, pagination },
  } = await request.get(
    `/boards?mainidx=${mainidx}&subidx=${subidx}&page=${page}&target=${target}&sort=${sortNow}`
  );
  return { data, pagination };
};

const pageListRender = ({ pagination }) => {
  const pageList = document.querySelector("#page");
  pageList.innerHTML = "";
  for (let i = pagination.startPageNum; i <= pagination.endPageNum; i++) {
    pageList.innerHTML += `<li data-page="${i}" data-startpage="${pagination.startPageNum}" data-endpage="${pagination.endPageNum}"  data-lastpage="${pagination.lastPage}" data-viewpagecount="${pagination.viewPageCount}">${i}</li>`;
  }
  nowPageNav({ page: pagination.page });
  pageList.addEventListener("click", pageListHandler);
};

const pageListHandler = async (e) => {
  const mainidx = queryString.get("mainidx");
  let { subidx } = document.querySelector(".cat_active[data-subidx]").dataset;
  if (subidx === "") {
    subidx = undefined;
  }
  const { page } = e.target.dataset;
  if (page) {
    const { data, pagination } = await getData({ mainidx, subidx, page });
    render({ data, pagination });
    nowPageNav({ page });
  }
};

const nowPageNav = ({ page }) => {
  const nowPageList = document.querySelectorAll(`[data-page]`);
  const nowPage = document.querySelector(`[data-page='${page}']`);
  for (let i = 0; i < nowPageList.length; i++) {
    nowPageList[i].classList.remove("now");
  }
  nowPage.classList.add("now");
};

const moveBtnEvent = () => {
  const leftBtn = document.querySelector(".left");
  const rightBtn = document.querySelector(".right");
  leftBtn.addEventListener("click", leftBtnHandler);
  rightBtn.addEventListener("click", rightBtnHandler);
};

const leftBtnHandler = async () => {
  const mainidx = queryString.get("mainidx");
  let { subidx } = document.querySelector(".cat_active[data-subidx]").dataset;
  if (subidx === "") {
    subidx = undefined;
  }
  const nowPage = document.querySelector(`.now[data-page]`);
  const { page, startpage, endpage, lastpage, viewpagecount } = nowPage.dataset;

  if (page === 1) {
    return;
  }
  if (page !== startpage) {
    const { data, pagination } = await getData({
      mainidx,
      subidx,
      page: startpage,
    });
    render({ data });
    pageListRender({ pagination });
    nowPageNav({ page: pagination.page });
  } else {
    const { data, pagination } = await getData({
      mainidx,
      subidx,
      page: Number(startpage) - 1,
    });
    render({ data });
    pageListRender({ pagination });
    nowPageNav({ page: pagination.page });
  }
};

const rightBtnHandler = async () => {
  const mainidx = queryString.get("mainidx");
  let { subidx } = document.querySelector(".cat_active[data-subidx]").dataset;
  if (subidx === "") {
    subidx = undefined;
  }
  const nowPage = document.querySelector(`.now[data-page]`);
  const { page, startpage, endpage, lastpage, viewpagecount } = nowPage.dataset;

  if (page === lastpage) {
    return;
  }
  if (endpage === lastpage) {
    const { data, pagination } = await getData({
      mainidx,
      subidx,
      page: endpage,
    });
    render({ data });
    pageListRender({ pagination });
    nowPageNav({ page: pagination.page });
    return;
  }

  if (page <= endpage) {
    const { data, pagination } = await getData({
      mainidx,
      subidx,
      page: Number(endpage) + 1,
    });
    render({ data });
    pageListRender({ pagination });
    nowPageNav({ page: pagination.page });
  }
};

const sortHandler = async (e) => {
  const mainidx = queryString.get("mainidx");
  let { subidx } = document.querySelector(".cat_active[data-subidx]").dataset;
  if (subidx === "") {
    subidx = undefined;
  }
  const sort = {
    old: "ASC",
    new: "DESC",
  };
  sortNow = sort[e.target.value];
  const { page } = document.querySelector(`.now[data-page]`).dataset;
  const { data, pagination } = await getData({
    mainidx,
    subidx,
    page,
    sortNow,
  });
  render({ data });
  pageListRender({ pagination });
  nowPageNav({ page: pagination.page });
};

const init = async () => {
  const mainidx = queryString.get("mainidx");
  const writeBtn = document.querySelector("#writebtn");
  const sortBtn = document.querySelector("#sort");

  const { data, pagination } = await getData({ mainidx });
  render({ data });
  const [categories] = (await getCategory({ mainidx })).data;
  categoryTitleRender({ categories });
  pageListRender({ pagination });
  nowPageNav({ page: pagination.page });
  moveBtnEvent();

  writeBtn.addEventListener("click", () => {
    location.href = `/boards/write?mainidx=${mainidx}`;
  });
  subCategories.addEventListener("click", subCatHandler);
  sortBtn.addEventListener("change", sortHandler);
};

const subCategories = document.querySelector("#subcategories");

const subCatHandler = async (e) => {
  const subCat = document.querySelectorAll("#subcategories > li");
  const { tagName } = e.target;
  if (tagName === "LI") {
    for (let i = 0; i < subCat.length; i++) {
      subCat[i].classList.remove("cat_active");
    }
    e.target.classList.add("cat_active");
  }
  const mainidx = queryString.get("mainidx");
  let { subidx } = document.querySelector(".cat_active[data-subidx]").dataset;
  if (subidx === "") {
    subidx = undefined;
  }

  const { data, pagination } = await getData({ mainidx, subidx });
  render({ data });
  pageListRender({ pagination });
  nowPageNav({ page: pagination.page });
  moveBtnEvent();
};

init();
