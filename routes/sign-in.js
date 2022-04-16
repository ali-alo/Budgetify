const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");

const { userRepository } = require("../public/js/user_repository");
const userRepo = new userRepository();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

// users and admin authentication
router.post("/", (req, res) => {
  userRepo.signIn(req.body.email, req.body.password, (user) => {
    if (!user) res.send("Email or password is incorrect");
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
      res.json({
        token: user.token,
        expiresIn: process.env.JWT_EXPIRES_IN,
        id: user._id,
      });
    }
  });
});

module.exports = router;
