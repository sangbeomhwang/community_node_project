const express = require("express");
const app = express();
const nunjucks = require("nunjucks");
const cookieParser = require("cookie-parser");
const axios = require("axios");

const request = axios.create({
  baseURL: `http://127.0.0.1:3000`,
  withCredentials: true,
});

app.set("view engine", "html");
nunjucks.configure("views", {
  express: app,
});

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use((req, res, next) => {
  // console.log(`req.cookies :`, req.cookies);
  try {
    const { token } = req.cookies;
    const [header, payload, signature] = token.split(".");

    const decodedPl = JSON.parse(
      Buffer.from(payload, "base64").toString("utf-8")
    );

    req.user = decodedPl;
  } catch (e) {
  } finally {
    next();
  }
});

app.get("/", (req, res) => {
  // console.log(`req.user :`, req.user);
  if (req.user === undefined) return res.render("index.html");
  const { userid, username } = req.user;
  res.render("index.html", {
    userid,
    username,
  });
});

app.get("/terms", (req, res) => {
  res.render("user/terms.html");
});

app.post("/terms", (req, res) => {
  res.redirect("/signup");
});

app.get("/signup", (req, res) => {
  res.render("user/signup.html");
});

app.post("/signup", async (req, res) => {
  const response = await request.post("/users", {
    ...req.body,
  });
  // console.log(`response :`, response);
  const { userid, username, userpw } = response.data;

  res.redirect(`/welcome?userid=${userid}&username=${username}`);
});

app.get("/welcome", (req, res) => {
  const { userid, username, userpw } = req.query;
  res.render("user/welcome.html", {
    userid,
    username,
  });
});

app.get("/signin", (req, res) => {
  res.render("user/signin.html");
});

app.get("/profile", (req, res) => {
  res.render("user/profile.html", { ...req.user });
});

app.get("/profileModify", (req, res) => {
  res.render("user/profileModify.html", { ...req.user });
});

app.post("/profileModify", async (req, res) => {
  // console.log("modify :", req.body)
  const response = await request.put("/users", { ...req.body });
  console.log("response :", response.data.token);
  res.cookie("token", response.data.token);
  res.redirect("/profile");
});

const HOST = "https://kauth.kakao.com";
const REST_API_KEY = "생략";
const REDIRECT_URI = "http://localhost:3000/oauth/kakao";
const CLIENT_SECRET = "생략";

app.get("/kakao/login", (req, res) => {
  // kauth.kakao.com
  // /oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code
  const redirectURI = `${HOST}/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  res.redirect(redirectURI);
});

app.listen(3005, () => {
  console.log(`front server listening on 3005`);
});
