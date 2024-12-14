const connectToMongo = require("./db");
// const Print = require('./routes/Print');

const express = require("express");
var cors = require("cors");

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/User"));

const server = app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

connectToMongo();
