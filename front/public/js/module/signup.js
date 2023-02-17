import request from "/js/lib/request.js";

const checkInput = async (inputId, reg, callback) => {
  document.querySelector(`#${inputId}_row`).addEventListener("keyup", async () => {
    let error = document.querySelector(`#${inputId}_row .alertMessage`);
    let input = document.querySelector(`#${inputId}`);
    if (!reg.test(input.value)) {
      error.style.opacity = 1;
      error.style.transition = "opacity 0.2s ease-in-out";
    } else {
      error.style.opacity = 0;
      error.style.transition = "opacity 0.2s ease-in-out";
      callback(inputId);
    }
  });
};

// 중복 체크
const duplicateCheck = async (inputId) => {
  const check = document.querySelector(`#${inputId}_row .alertMessage`);
  const input = document.querySelector(`#${inputId}`);
  const response = await request.post("/users/usercheck", {
    [inputId]: input.value,
  });
  if (response.data !== null) {
    check.innerHTML = "이미 사용중입니다";
    check.style.color = "red";
  } else {
    check.innerHTML = "사용할 수 있습니다";
    check.style.color = "green";
  }
  check.style.opacity = 1;
};

const config = {
  userid: {
    reg: /^[A-Za-z0-9]{6,16}$/,
    callback: duplicateCheck,
  },
  nickname: {
    reg: /^[A-Za-z가-힣0-9]{2,16}$/,
    callback: duplicateCheck,
  },
  password: {
    reg: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/,
    // callback: null,
  },
  email: {
    reg: /^[A-Za-z0-9]+@[A-Za-z0-9.-_]{1,10}.[A-Za-z]{2,4}$/,
    callback: duplicateCheck,
  },
};

for (const key in config) {
  checkInput(key, config[key].reg, config[key].callback);
}

// 패스워드 재확인
document.querySelector("#pwcheck").addEventListener("keyup", () => {
  if (document.querySelector("#password").value !== document.querySelector("#pwcheck").value) document.querySelector(".checkMessage").style.opacity = 1;
  else {
    document.querySelector(".checkMessage").innerHTML = "비밀번호가 일치합니다";
    document.querySelector(".checkMessage").style.color = "green";
  }
});
