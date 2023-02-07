const platform = {
  Windows: "http://localhost:3000",
  macOS: "http://127.0.0.1:3000",
};

const url = platform[navigator.userAgentData.platform];

const request = axios.create({
  baseURL: `${url}`,
  withCredentials: true,
});

export default request;
