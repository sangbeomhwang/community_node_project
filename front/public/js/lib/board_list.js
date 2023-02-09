import request from "/js/lib/request.js";
import { boardListTemplate } from "/js/lib/template.js";
const queryString = new URLSearchParams(location.search);

const render = ({ data }) => {
  const contentBox = document.querySelector("#content_body > ul");
  contentBox.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    contentBox.innerHTML += boardListTemplate(data[i]);
  }
};

const getData = async ({ mainidx, subidx, page }) => {
  const {
    data: { data, pagination },
  } = await request.get(`/boards?mainidx=${mainidx}&subidx=${subidx}&page=${page}`);
  return { data, pagination };
};

const getCategory = async ({ mainidx }) => {
  const { data } = await request.get(`/categories?mainidx=${mainidx}`);
  return { data };
};

const categoryTitleRender = ({ categories }) => {
  const mainTitle = document.querySelector("#subject");
  const subTitles = document.querySelector("#subcategories");
  const { SubCategories } = categories;

  mainTitle.innerHTML = `<div data-mainidx="${categories.mainidx}">${categories.title}</div>`;
  subTitles.innerHTML = `<li>전체</li>`;
  for (let i = 0; i < SubCategories.length; i++) {
    subTitles.innerHTML += `<li data-subidx="${SubCategories[i].subidx}">${SubCategories[i].title}</li>`;
  }
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
  const { page } = e.target.dataset;
  if (page) {
    const { data, pagination } = await getData({ mainidx, page });
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
  const nowPage = document.querySelector(`.now[data-page]`);
  const { page, startpage, endpage, lastpage, viewpagecount } = nowPage.dataset;

  if (page === 1) {
    console.log("끝");
    return;
  }
  if (page !== startpage) {
    const { data, pagination } = await getData({ mainidx, page: startpage });
    render({ data });
    pageListRender({ pagination });
    nowPageNav({ page: pagination.page });
  } else {
    const { data, pagination } = await getData({ mainidx, page: Number(startpage) - 1 });
    render({ data });
    pageListRender({ pagination });
    nowPageNav({ page: pagination.page });
  }
};

const rightBtnHandler = async () => {
  const mainidx = queryString.get("mainidx");
  const nowPage = document.querySelector(`.now[data-page]`);
  const { page, startpage, endpage, lastpage, viewpagecount } = nowPage.dataset;

  if (page === lastpage) {
    console.log("끝");
    return;
  }
  if (endpage === lastpage) {
    console.log("hh");
    const { data, pagination } = await getData({ mainidx, page: endpage });
    render({ data });
    pageListRender({ pagination });
    nowPageNav({ page: pagination.page });
    return;
  }

  if (page <= endpage) {
    const { data, pagination } = await getData({ mainidx, page: Number(endpage) + 1 });
    render({ data });
    pageListRender({ pagination });
    nowPageNav({ page: pagination.page });
  }
};

const init = async () => {
  const mainidx = queryString.get("mainidx");

  const { data, pagination } = await getData({ mainidx });
  render({ data });
  const [categories] = (await getCategory({ mainidx })).data;
  categoryTitleRender({ categories });
  pageListRender({ pagination });
  nowPageNav({ page: pagination.page });
  moveBtnEvent();
};

init();
