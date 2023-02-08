import request from "/js/lib/request.js";

const template = ({ boardidx, nickname, register, title, hashtag, hit, like, comment }) => `
 <li data-boardidx="${boardidx}">
   <div class="li_user">
     닉네임 ${nickname}
     <div>
     <span>등록일시</span>
       <span>${register}</span>
     </div>
   </div>
   <div class="li_sub"><a href="#">${title}</a></div>
   <div class="li_Cate">
     <a href="#">#Gitjub #Repository</a>
     <div>
       <div>
         조회수<img
           src="https://i.postimg.cc/XYD9XSTJ/ph-eye.png"
         /><span>${hit}</span>
       </div>
       <div>
         좋아요<img
           src="https://i.postimg.cc/JnXFPQbN/Vector.png"
         /><span>0</span>
       </div>
       <div>
         댓글<img
           src="https://i.postimg.cc/5ynS3Hk5/Vector-1.png"
         /><span>0</span>
       </div>
     </div>
   </div>
 </li>
 `;

const contentBox = document.querySelector("#content_body > ul");
const queryString = new URLSearchParams(location.search);

const render = async ({ mainidx, subidx, page }) => {
  const {
    data: { data, pagination },
  } = await request.get(`/boards?mainidx=${mainidx}&subidx=${subidx}&page=${page}`);
  contentBox.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    contentBox.innerHTML += template(data[i]);
  }
  return pagination;
};

const init = async () => {
  const categoryTitle = async (mainidx) => {
    const category = document.querySelector("#subject");
    category.innerHTML = "";
    const { data } = await request.get(`/categories?mainidx=${mainidx}`);
    category.innerHTML = `<div data-mainidx="${data[0].mainidx}">${data[0].title}</div>`;
  };

  const subCategoryTitle = async (mainidx) => {
    const subCategory = document.querySelector("#subcategories");
    subCategory.innerHTML = "";
    const { data } = await request.get(`/categories?mainidx=${mainidx}`);
    const { SubCategories } = data[0];
    subCategory.innerHTML = `<li>전체</li>`;
    for (let i = 0; i < SubCategories.length; i++) {
      subCategory.innerHTML += `<li data-subidx="${SubCategories[i].subidx}">${SubCategories[i].title}</li>`;
    }
  };

  const leftBtnHandler = async () => {
    if (result.page === 1) {
      return;
    } else {
      result = await render({ mainidx, subidx, page: result.startPageNum - 1 });
      drawPageList(result);
      const nowPage = document.querySelector(`[data-page='${result.page}']`);
      nowPage.classList.add("now");
    }
  };

  const leftBtn = document.querySelector(".left");
  leftBtn.addEventListener("click", leftBtnHandler);

  const rightBtnHandler = async () => {
    if (result.page === result.lastPage) {
      return;
    }
    if (result.endPageNum + 1 < result.lastPage) {
      result = await render({ mainidx, subidx, page: result.endPageNum + 1 });
      drawPageList(result);
      const nowPage = document.querySelector(`[data-page='${result.page}']`);
      nowPage.classList.add("now");
    } else {
      result = await render({ mainidx, subidx, page: result.endPageNum });
      drawPageList(result);
      const nowPage = document.querySelector(`[data-page='${result.page}']`);
      nowPage.classList.add("now");
    }
  };

  const rightBtn = document.querySelector(".right");
  rightBtn.addEventListener("click", rightBtnHandler);

  const pageList = document.querySelector("#page");
  const drawPageList = (result) => {
    pageList.innerHTML = "";

    for (let i = result.startPageNum; i <= result.endPageNum; i++) {
      pageList.innerHTML += `<li data-page='${i}'>${i}</li>`;
    }
  };

  const pageListHandler = async (e) => {
    const { page } = e.target.dataset;
    if (page) {
      result = await render({ mainidx, subidx, page });
    }
    const nowPageList = document.querySelectorAll(`[data-page]`);
    for (let i = 0; i < nowPageList.length; i++) {
      nowPageList[i].classList.remove("now");
    }
    const nowPage = document.querySelector(`[data-page='${result.page}']`);
    nowPage.classList.add("now");
  };

  pageList.addEventListener("click", pageListHandler);

  const mainidx = queryString.get("mainidx");
  const subidx = queryString.get("subidx");
  const page = queryString.get("page");

  categoryTitle(mainidx);
  subCategoryTitle(mainidx);
  let result = await render({ mainidx, subidx, page });
  drawPageList(result);
  const nowPage = document.querySelector(`[data-page='${result.page}']`);
  nowPage.classList.add("now");

  const subCategory = document.querySelector("#subcategories");
  const subHandler = async (e) => {
    const { subidx } = e.target.dataset;
    if (!subidx) {
      let result = await render({ mainidx });
      drawPageList(result);
      const nowPageList = document.querySelectorAll(`[data-page]`);
      for (let i = 0; i < nowPageList.length; i++) {
        nowPageList[i].classList.remove("now");
      }
      const nowPage = document.querySelector(`[data-page='${result.page}']`);
      nowPage.classList.add("now");
    }
    let result = await render({ mainidx, subidx });
    drawPageList(result);
    const nowPageList = document.querySelectorAll(`[data-page]`);
    for (let i = 0; i < nowPageList.length; i++) {
      nowPageList[i].classList.remove("now");
    }
    const nowPage = document.querySelector(`[data-page='${result.page}']`);
    nowPage.classList.add("now");

    // test

    const leftBtnHandler = async () => {
      if (result.page === 1) {
        return;
      } else {
        result = await render({ mainidx, subidx, page: result.startPageNum - 1 });
        drawPageList(result);
        const nowPage = document.querySelector(`[data-page='${result.page}']`);
        nowPage.classList.add("now");
      }
    };

    const leftBtn = document.querySelector(".left");
    leftBtn.addEventListener("click", leftBtnHandler);

    const rightBtnHandler = async () => {
      if (result.page === result.lastPage) {
        return;
      }
      if (result.endPageNum + 1 < result.lastPage) {
        result = await render({ mainidx, subidx, page: result.endPageNum + 1 });
        drawPageList(result);
        const nowPage = document.querySelector(`[data-page='${result.page}']`);
        nowPage.classList.add("now");
      } else {
        result = await render({ mainidx, subidx, page: result.endPageNum });
        drawPageList(result);
        const nowPage = document.querySelector(`[data-page='${result.page}']`);
        nowPage.classList.add("now");
      }
    };

    const rightBtn = document.querySelector(".right");
    rightBtn.addEventListener("click", rightBtnHandler);
  };

  subCategory.addEventListener("click", subHandler);
};

init();
