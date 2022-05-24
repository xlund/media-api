const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const routes = require("./routes");
const path = require("path");
const history = require("connect-history-api-fallback");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const HOST = process.env.HOST;
const PORT = process.env.PORT;

app.use("/api", routes);

app.use(cors());

const _path = path.join(__dirname + "/public/");
console.log(_path);

app.use(history());
app.use(express.static(_path));
app.get("/", (req, res) => {
  res.sendFile(_path + "/dist/index.html");
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server running on ${process.env.HOST}:${process.env.PORT}`);
});
