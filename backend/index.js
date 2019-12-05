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
app.use(cors());
const user = require("./routes/api/user");
const course = require("./routes/api/course");
const slot = require("./routes/api/slot");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", user);
app.use("/api/course", course);
app.use("/api/slot", slot);
const port = 3001;
app.listen(port, () =>
  console.log(`Server is up and running on server ${port}`)
);
