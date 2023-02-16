import request from "/js/lib/request.js";
import { adminBoardListTemplate } from "/js/lib/boardList.js";
import { getCategory, categoryTitleRender } from "/js/lib/getCategory.js";
const queryString = new URLSearchParams(location.search);
let sortNow = "ASC";

const render = async ({ data }) => {
  console.log(data)
  const boardListBox = document.querySelector("#allusers_body > ul");
  console.log(boardListBox)

  boardListBox.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    // console.log("################", boardList);
    boardListBox.innerHTML += adminBoardListTemplate(data[i]);
  }

  const default_img = document.querySelectorAll(
    "#allusers_body > ul > li > ul > li > img"
  );

  for (let i = 0; i < default_img.length; i++) {
    // profile image에 아직 어떠한 이미지도 따로 지정하지 않은 경우에는 기본 profile image를 적용해주는 코드
    if (default_img[i].src.indexOf("http://127.0.0.1:3000/") === -1) {
      default_img[i].src =
        "https://cdn-icons-png.flaticon.com/512/64/64572.png";
    }
  }

  const title_content = document.querySelectorAll(
    "#allusers_body > ul > li > ul > #title_length"
  );

  // console.log("check ~~~ :", title_content);

  for (let i = 0; i < title_content.length; i++) {
    const default_len = 28;
    const last_text = "...";

    if (title_content[i].textContent.length > default_len) {
      title_content[i].textContent =
        title_content[i].textContent.substring(0, default_len) + last_text;
    }
  }

  // function textLengthOverCut(txt, len, lastTxt) {
  //   if (len == "" || len == null) {
  //     // 기본값
  //     len = 20;
  //   }
  //   if (lastTxt == "" || lastTxt == null) {
  //     // 기본값
  //     lastTxt = "...";
  //   }
  //   if (txt.length > len) {
  //     txt = txt.substr(0, len) + lastTxt;
  //   }
  //   return txt;
  // }
};

const getData = async ({ mainidx, subidx, page, target = "boardidx" }) => {
  const {
    data: { data, pagination },
  } = await request.get(
    `/boards?mainidx=${mainidx}&subidx=${subidx}&page=${page}&target=${target}&sort=${sortNow}`
  );
  return { data, pagination };
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

};

const init = async () => {

  const sortBtn = document.querySelector("#category_sort");

  const { data, pagination } = await getData({ });
  render({ data });

  sortBtn.addEventListener("change", sortHandler);
};

init();
