import request from "/js/lib/request.js";

const getCategory = async ({ mainidx }) => {
  const { data } = await request.get(`/categories?mainidx=${mainidx}`);
  return { data };
};

const categoryTitleRender = ({ categories, all = true }) => {
  const mainTitle = document.querySelector("#subject");
  const subTitles = document.querySelector("#subcategories");
  const { SubCategories } = categories;

  const classList = {
    "Q&A": "qna",
    커뮤니티: "community",
    공지사항: "notice",
  };

  if (all) {
    mainTitle.innerHTML = `<div data-mainidx="${categories.mainidx}">${categories.title}</div>`;
    mainTitle.classList.add(classList[categories.title]);
    subTitles.innerHTML = `<li data-subidx="" class="cat_active">전체</li>`;
    for (let i = 0; i < SubCategories.length; i++) {
      subTitles.innerHTML += `<li data-subidx="${SubCategories[i].subidx}">${SubCategories[i].title}</li>`;
    }
  } else {
    mainTitle.innerHTML = `<div data-mainidx="${categories.mainidx}">${categories.title}</div>`;
    mainTitle.classList.add(classList[categories.title]);
    for (let i = 0; i < SubCategories.length; i++) {
      if (i === 0) {
        subTitles.innerHTML += `<li data-subidx="${SubCategories[i].subidx}" class="cat_active">${SubCategories[i].title}</li>`;
        continue;
      }
      subTitles.innerHTML += `<li data-subidx="${SubCategories[i].subidx}">${SubCategories[i].title}</li>`;
    }
  }
};

export { getCategory, categoryTitleRender };
