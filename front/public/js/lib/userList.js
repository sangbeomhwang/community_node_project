import request from "/js/lib/request.js";

const userListTemplate = ({
  image,
  userid,
  name,
  nickname,
  email,
  level,
  access,
}) => `
<li>
    <ul>
        <li class="users_info">
            <img src="${image}" />
        </li>
        <li class="users_info">${userid}</li>
        <li class="users_info">${name}</li>
        <li class="users_info">${nickname}</li>
        <li class="users_info">${email}</li>
        <li class="users_info">
            <form action="/admins/userModify/${nickname}" method="post">
                <input type="text" id="levelBox" name="level" value="${level}" />
                <input type="text" id="accessBox" name="access" value="${access}" />
                <button class="modify_item" type="submit">수정완료</button>
            </form>
        </li>
    </ul>
</li>
`;

const userListBox = document.querySelector("#allusers_body > ul");
// console.log(userListBox);

const render = async () => {
  const response = await request.get(`/admins/userlist`);
  const userList = response.data.response;
  // console.log("response :::", userList);

  userListBox.innerHTML = "";

  for (let i = 0; i < userList.length; i++) {
    // console.log("################", userList);
    userListBox.innerHTML += userListTemplate(userList[i]);
  }

  const default_img = document.querySelectorAll(
    "#allusers_body > ul > li > ul > li > img"
  );

  console.log(default_img);

  for (let i = 0; i < default_img.length; i++) {
    // profile image에 아직 어떠한 이미지도 따로 지정하지 않은 경우에는 기본 profile image를 적용해주는 코드
    if (default_img[i].src.indexOf("http://127.0.0.1:3000/") === -1) {
      default_img[i].src =
        "https://cdn-icons-png.flaticon.com/512/64/64572.png";
    }
  }

  // console.log("check $$$$ : ", userListBox);
  return response;
};

render();
