require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { s3Uploadv2 } = require("./s3Service");
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
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     const { originalname } = file;
//     cb(null, `${uuid()}-${originalname}`);
//   },
// });

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] === "image") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};

const upload1 = multer({
  storage,
  fileFilter,
  limits: { fileSize: 100000000, files: 2 },
});

app.get("/", (req, res) => {
  res.json({ msg: "msg" });
});

app.post("/upload", upload1.array("file"), async (req, res) => {
  try {
    const results = await s3Uploadv2(req.files);
    console.log(results);
    res.json({ status: "success" });
  } catch (error) {
    console.log("err ==>", error);
  }
});

app.use((error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === "LIMIT_FILE_SIZE") {
      return res.json({
        message: "file is too large",
      });
    }

    if (error.code === "LIMIT_FILE_COUNT") {
      return res.json({ message: "File limit reached" });
    }

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({ message: "File must be of image" });
    }
  }
});

app.listen(4000, () => {
  console.log(`server is running at localhost:4000`);
});
