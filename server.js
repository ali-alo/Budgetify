require("dotenv").config();

const express = require("express");
const jwt = require("jsonwebtoken");

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

app.get("/", (req, res) => {
  res.render("index");
});

// users and admin authentication
app.post("/sign-in", (req, res) => {
  userRepo.signIn(req.body.login, req.body.password, (user) => {
    if (!user) res.send("Incorrect inputs");
    else {
      const payload = {
        id: user.id,
        name: user.name,
        login: user.login,
      };
      user.token = jwt.sign(payload, process.env.JWT_SECRET_TOKEN, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });
      res.user = user;
      res.json(user);
    }
  });
});

app.listen(process.env.PORT, () => {
  console.log(`The app is running on port ${process.env.PORT}`);
});
