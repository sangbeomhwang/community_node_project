import request from "/js/lib/request.js";

const frm = document.querySelector("#loginFrm");

let date = new Date();
date.setTime(date.getTime() + 1 * 60 * 60 * 1000);

frm.addEventListener("submit", async (e) => {
  try {
    e.preventDefault();

    const { userid, password } = e.target;

    const response = await request.post("/auths", {
      userid: userid.value,
      password: password.value,
    });

    const status = response.data.status; // HttpException
    if (status >= 400) throw new Error(e);
    else if (response.status >= 200) {
      document.cookie = `token=${response.data.token}; expires=${date.toUTCString()};path=/;`;
      location.href = "/";
    }
  } catch (e) {
    alert(`아이디와 패스워드가 일치하지 않습니다`);
  }
});
