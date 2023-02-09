const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

class App {
  constructor() {
    this.app = express();
    this.setMiddleWare();
    this.setRouting();
    this.setStatic();
    this.errorHandler();
  }

  setMiddleWare() {
    this.app.use(cors({ origin: true, credentials: true }));
    this.app.use(cookieParser());
    this.app.use(express.json());
  }

  setRouting() {
    this.app.use(require("./routes"));
  }

  setStatic() {
    this.app.use(express.static("uploads"));
  }

  errorHandler() {
    this.app.use((err, req, res, next) => {
      res.status(500).send(err.message);
    });
  }
}

module.exports = new App().app;
