const express = require("express");
const multer = require("multer");
const uuid = require("uuid").v4;
const app = express();

//middleware
const upload = multer({ dest: "uploads/" });

// for single file
// app.post("/upload", upload.single("file"), (req, res) => {
//   res.json({ status: "success" });
// });

// for multiple files
// app.post("/upload", upload.array("file", 2), (req, res) => {
//   res.json({ status: "success" });
// });

// multiple fields upload
// const multiUpload = upload.fields([
//   { name: "avatar", maxCount: 2 },
//   { name: "resume", maxCount: 2 },
// ]);

// app.post("/upload", multiUpload, (req, res) => {
//   console.log(req.files);
//   res.json({ status: "success" });
// });

// custom filename
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, `${uuid()}-${originalname}`);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new Error("file is not of the correct type"), false);
  }
};

const upload1 = multer({ storage, fileFilter });
app.post("/upload", upload1.array("file"), (req, res) => {
  res.json({ status: "success" });
});

app.listen(4000, () => {
  console.log(`server is running at localhost:4000`);
});
