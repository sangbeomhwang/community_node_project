const express = require("express");
const app = express();
const nunjucks = require("nunjucks");
const cookieParser = require("cookie-parser");
const router = require("./routes/index");

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

app.use(router);

app.get("/", (req, res) => {
  // console.log(`req.user :`, req.user);
  if (req.user === undefined) return res.render("index.html");
  console.log(`req.user :`, req.user);
  const { userid, nickname } = req.user;
  res.render("index.html", {
    userid,
    nickname,
  });
});

app.use((error, req, res, next) => {
  res.status(500).json(error.message);
});

app.listen(3005, () => {
  console.log(`front server listening on 3005`);
});
