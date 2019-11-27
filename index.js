const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const passport = require("passport");
const app = express();
app.use(cors());
app.use(express.json());
const port = 3001;
app.get("/", (req, res) => {
  res.send("mostafa");
});
app.listen(port, () =>
  console.log(`Server is up and running on server ${port}`)
);
