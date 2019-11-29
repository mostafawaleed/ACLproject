const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const passport = require("passport");

const app = express();
const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const user = require("./routes/api/user");
const course = require("./routes/api/course");
app.use(cors());
app.use("/api/user", user);
app.use("/api/course", course);

const port = 3000;
app.get("/", (req, res) => {
  res.send("mostafa");
});
app.listen(port, () =>
  console.log(`Server is up and running on server ${port}`)
);
