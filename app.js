const express = require("express");
const multer = require("multer");

const PORT = 4000;
const app = express();

app.get("/", (req, res) => {
  res.json({ hello: "abhishek" });
});

app.post("/upload", (req, res) => {
  res.json({ status: "success" });
});

app.listen(PORT, () => {
  console.log(`server is running at localhost:${PORT}`);
});
