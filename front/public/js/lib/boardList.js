const BoardListTemplate = ({ image, userid, title, register, hit }) => {
  return `
<li>
  <ul>
    <li class="users_info">
      <img src="http://127.0.0.1:3000/${image}" />
    </li>
    <li class="users_info">${userid}</li>
    <li class="users_info">${title}</li>
    <li class="users_info">${register}</li>
    <li class="users_info">${hit}</li>
    <li class="users_info">
      <img src="https://i.postimg.cc/fTCt8QGZ/Vector-1.png" />
    </li>
  </ul>
</li>
`;
};

export { BoardListTemplate };
