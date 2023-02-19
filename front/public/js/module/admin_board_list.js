import request from "/js/lib/request.js";
import { adminBoardListTemplate } from "/js/lib/boardList.js";
let sortNow = "DESC";

const render = async ({ data }) => {
  const boardListBox = document.querySelector("#allusers_body > ul");

  boardListBox.innerHTML = "";

  for (let i = 0; i < data.length; i++) {
    boardListBox.innerHTML += adminBoardListTemplate(data[i]);
  }

  const default_img = document.querySelectorAll("#allusers_body > ul > li > ul > li > img");

  const server = document.querySelector("#server").value;
  for (let i = 0; i < default_img.length; i++) {
    // profile image에 아직 어떠한 이미지도 따로 지정하지 않은 경우에는 기본 profile image를 적용해주는 코드
    if (default_img[i].src.indexOf(`${server}`) === -1) {
      default_img[i].src = "/img/profile_img.png";
    }
  }

  const title_content = document.querySelectorAll("#allusers_body > ul > li > ul > #title_length");

  for (let i = 0; i < title_content.length; i++) {
    const default_len = 15;
    const last_text = "...";

    if (title_content[i].textContent.length > default_len) {
      title_content[i].textContent = title_content[i].textContent.substring(0, default_len) + last_text;
    }
  }
};

const getData = async ({ target = "boardidx" }) => {
  const response = await request.get(`/boards?level=ok`);
  const totalBoardsNum = response.data.pagination.totalBoards;

  console.log("num check~~~ : ", totalBoardsNum);

  const totalListBox = document.querySelector("#totalListNum");
  totalListBox.textContent = `Total Boards: ${totalBoardsNum}`;

  const {
    data: { data, pagination },
  } = await request.get(`/boards?maxBoards=${totalBoardsNum}&level=ok&target=${target}&sort=${sortNow}`);

  return { data, pagination };
};

const sortHandler = async (e) => {
  const sort = {
    latest: "DESC",
    old: "ASC",
  };
  sortNow = sort[e.target.value];
  // const { page } = document.querySelector(`[data-page]`).dataset;
  const { data, pagination } = await getData({
    // page,
    sortNow,
  });
  render({ data });
};

const init = async () => {
  const sortBtn = document.querySelector("#category_sort");

  const { data, pagination } = await getData({});
  render({ data });

  sortBtn.addEventListener("change", sortHandler);
};

init();
