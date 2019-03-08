const express = require("express");
const parser = require("body-parser");
const morgan = require("morgan");
const router = require("./router.js");
const path = require("path");
const cors = require("cors");
const compression = require("compression");
const app = express();
const port = 3000;

//middleware
app.use(morgan("dev"));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());

app.get("*.js", (req, res, next) => {
  console.log("js requested");
  req.url = req.url + ".gz";
  res.set("Content-Encoding", "gzip");
  next();
});

//serve up static files
app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/bundle", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/bundle"));
});

app.use("/api", router);

app.listen(port, err => {
  if (err) {
    return console.log(err);
  }
  console.log(`Listening on ${port}`);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});
