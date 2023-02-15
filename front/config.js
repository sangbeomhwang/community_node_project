require("dotenv").config();

const config = {
  kakao: {
    host: process.env.KAKAO_HOST || "",
    rest_api_key: process.env.REST_API_KEY || "",
    redirect_uri: process.env.REDIRECT_URI || "",
    client_secret: process.env.CLIENT_SECRET || "",
  },
};

module.exports = config;
