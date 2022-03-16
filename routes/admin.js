const express = require("express");
const router = express.Router();

const { userRepository } = require("../public/js/user_repository");
const userRepo = new userRepository();

const { adminGuard } = require("../guards");
const { jwtCallback } = require("../passport");

const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_TOKEN,
};
passport.use(new JwtStrategy(opts, jwtCallback));
const auth = passport.authenticate("jwt", { session: false });
router.use(passport.initialize());

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/", auth, adminGuard, (req, res) => {
  res.send("Welcome to admin home page");
});

router.get("/view-users", auth, adminGuard, (req, res) => {
  res.json(userRepo.getAll());
});

router.post("/create-user", auth, adminGuard, (req, res) => {
  const user = {
    name: req.body.name,
    login: req.body.login,
    password: req.body.password,
  };
  userRepo.create(user, req.body.passwordConfirm, (err) => {
    if (err) {
      res.send("Couldn't add the user");
    } else {
      res.json(user);
    }
  });
});

router
  .route("/user/:id")
  .get(auth, adminGuard, (req, res) => {
    res.json(userRepo.getById(req.params.id));
  })
  .delete(auth, adminGuard, (req, res) => {
    userRepo.delete(req.params.id, (err) => {
      if (err)
        res.status(404).json({ message: "User with this id does not exist" });
      else res.send(`User with the id ${req.params.id} is deleted`);
    });
  });

router.put("/user/:id/edit", auth, adminGuard, (req, res) => {
  const userUpdated = {
    id: req.params.id,
    name: req.body.name,
    login: req.body.login,
    balance: req.body.balance,
    password: req.body.password,
    incomes: req.body.incomes,
    expenses: req.body.expenses,
    categories: req.body.categories,
  };

  userRepo.update(userUpdated, req.body.passwordConfirm, (err) => {
    if (err) {
      res.status(400).json({ message: "Invalid input" });
    } else {
      res.json(userRepo.getAll());
    }
  });
});

module.exports = router;
