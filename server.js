require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userRouter = require("./routes/user");
const adminRouter = require("./routes/admin");
const { userRepository } = require("./public/js/user_repository");
const userRepo = new userRepository();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/static", express.static("./public"));

app.set("view engine", "ejs");

app.use("/user", userRouter);

app.use("/admin", adminRouter);

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

// users and admin authentication
app.post("/sign-in", (req, res) => {
  userRepo.signIn(req.body.email, req.body.password, (user) => {
    if (!user) res.send("Incorrect inputs");
    else {
      const payload = {
        id: user._id,
        name: user.name,
        email: user.email,
      };
      user.token = jwt.sign(payload, process.env.JWT_SECRET_TOKEN, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      res.user = user;
      res.json(user.token);
    }
  });
});

app.listen(process.env.PORT, () => {
  console.log(`The app is running on port ${process.env.PORT}`);
});
