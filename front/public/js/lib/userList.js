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
            <img src="http://127.0.0.1:3000/${image}" />
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
console.log(userListBox);
const render = async () => {
  const response = await request.get(`/admins/userlist`);
  console.log("response :::", response.data);

  console.log(userListBox);
  userListBox.innerHTML = "";
  for (let i = 0; i < response.data.length; i++) {
    // console.log("################", response.data);
    userListBox.innerHTML += userListTemplate(response.data[i]);
  }

  console.log("check $$$$ : ", userListBox);
  return response;
};

render();
