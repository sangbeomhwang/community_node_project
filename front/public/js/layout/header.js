import request from "/js/lib/request.js";
const template = (mainidx, title) => {
  return ` <li>
    <a href="/boards?mainidx=${mainidx}">${title}</a>
    </li>`;
};

const init = async () => {
  const category = document.querySelector("#category");
  category.innerHTML = "";

  const { data } = await request.get("/categories");

  for (let i = 0; i < data.length; i++) {
    category.innerHTML += template(data[i].mainidx, data[i].title);
  }
};

init();
