import request from "/js/lib/request.js";
import { mainPageTemplate } from "/js/lib/template.js";

const render = (box, { data }) => {
  box.innerHTML = "";
  for (let i = 0; i < data.length; i++) {
    box.innerHTML += mainPageTemplate(data[i]);
  }
};

const getData = async ({ mainidx, maxBoards = 5 }) => {
  const {
    data: { data },
  } = await request.get(`/boards?mainidx=${mainidx}&maxBoards=${maxBoards}`);
  return { data };
};

const boardContent = document.querySelectorAll(".board_content");

for (let i = 0; i < boardContent.length; i++) {
  const data = await getData({ mainidx: i });
  render(boardContent[i], data);
}
