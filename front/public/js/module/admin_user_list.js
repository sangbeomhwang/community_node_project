import request from "/js/lib/request.js";
import { userListTemplate } from "/js/lib/userList.js";
const queryString = new URLSearchParams(location.search);

const render = ({ data }) => {
  const userListBox = document.querySelector("#allusers_body > ul > li");
  userListBox.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    userListBox.innerHTML += userListTemplate(data[i]);
  }
};

const getData = async ({ nickname, page }) => {
  const {
    data: { data, pagination },
  } = await request.get(`/admins/userList/nickname=${nickname}&page=${page}`);
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
  const nickname = queryString.get("nickname");
  const { page } = e.target.dataset;
  if (page) {
    const { data, pagination } = await getData({ nickname, page });
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
    return;
  }
  if (page !== startpage) {
    const { data, pagination } = await getData({ mainidx, page: startpage });
    render({ data });
    pageListRender({ pagination });
    nowPageNav({ page: pagination.page });
  } else {
    const { data, pagination } = await getData({
      mainidx,
      page: Number(startpage) - 1,
    });
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
    return;
  }
  if (endpage === lastpage) {
    const { data, pagination } = await getData({ mainidx, page: endpage });
    render({ data });
    pageListRender({ pagination });
    nowPageNav({ page: pagination.page });
    return;
  }

  if (page <= endpage) {
    const { data, pagination } = await getData({
      mainidx,
      page: Number(endpage) + 1,
    });
    render({ data });
    pageListRender({ pagination });
    nowPageNav({ page: pagination.page });
  }
};
