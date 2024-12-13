const express = require("express");
const app = express();

app.use("/", (req, res) => {
  res.send("server is running.");
});

app.listen(4000, console.log("sever started on port 4000"));
