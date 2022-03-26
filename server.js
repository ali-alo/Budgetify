require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const signInRoute = require("./routes/sign-in");

const app = express();

app.use("/static", express.static("./public"));

app.set("view engine", "ejs");

app.use("/user", userRouter);

app.use("/admin", adminRouter);

app.use("/sign-in", signInRoute);

const dbURL = `${process.env.MONGODB_URI}${process.env.DB_NAME}`;

// test connection
mongoose.connect(
  dbURL,
  () => {
    console.log("Connected to database");
  },
  (err) => {
    console.log(err);
  }
);

app.get("/", (req, res) => {
  res.render("index");
});

app.listen(process.env.PORT, () => {
  console.log(`The app is running on port ${process.env.PORT}`);
});
