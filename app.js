const express = require("express");

const PORT = 4000;
const app = express();

app.listen(PORT, () => {
  console.log(`server is running at localhost:${PORT}`);
});
