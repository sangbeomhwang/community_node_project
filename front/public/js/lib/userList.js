import request from "/js/lib/request.js";

const userListTemplate = ({ image, userid, name, nickname, email }) => `
<li>
    <ul>
        <li class="users_info">
            <img src="http://127.0.0.1:3000/${image}" />
        </li>
        <li class="users_info">
            <a href="/users/profile">${userid}</a>
        </li>
        <li class="users_info">${name}</li>
        <li class="users_info">${nickname}</li>
        <li class="users_info">${email}</li>
        <li class="users_info">
            <form action="/admins/users/${nickname}" method="post">
                <button class="delete_item" type="submit">
                    <img src="https://i.postimg.cc/fTCt8QGZ/Vector-1.png" />
                </button>
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
