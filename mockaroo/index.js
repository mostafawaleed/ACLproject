const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const passport = require("passport");

const app = express();
app.use(cors());
const course = require("./routes/api/course");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/course", course);
const port = 3002;
app.listen(port, () =>
  console.log(`Server is up and running on server ${port}`)
);
