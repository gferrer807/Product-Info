const express = require("express");
const parser = require("body-parser");
const morgan = require("morgan");
const router = require("./router.js");
const path = require("path");
const cors = require("cors");
const compression = require("compression");
const cluster = require('cluster');
const app = express();
const port = 3000;
const controller = require('./controller');
const redis = require('redis');
const redisUrl = 'redis://localhost:6379';
const client = redis.createClient(redisUrl);

//middleware
app.use(morgan("dev"));
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());
app.use(compression());



if (cluster.isMaster) {
  // Count the machine's CPUs
  let cpuCount = require('os').cpus(); //run --old-max-space-size=4096


  // Create a worker for each CPU
  for (var i = 0; i < 2; i++) {
    cluster.fork();
  }
  // If worker dies, replace with new worker
  cluster.on('exit', function (worker) {
    console.log('Worker %d has died', worker.id);
    cluster.fork();
  });

} else {

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

  app.get("/loaderio-*", (req, res) => {
    res.sendfile(path.join(__dirname, '../loaderio-98606eb4ce3e97cca7906967ca9fac7f.txt'));
  });

  app.get("/bundle", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/bundle"));
  });

  app.use("/api", router);

  app.listen(port, err => {
    if (err) {
      return console.log(err);
    }
    client.flushall();
    console.log(`Listening on ${port}`);
  });

  app.get('/:id', (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
  });

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
}
