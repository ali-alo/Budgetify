const express = require("express");
const router = express.Router();

const { userRepository } = require("../public/js/user_repository");
const userRepo = new userRepository();

const { adminGuard, userGuard } = require("../guards");
const { auth } = require("../auth");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/", auth, adminGuard, (req, res) => {
  res.send("Welcome to admin home page");
});

router.get("/view-users", auth, adminGuard, userRepo.getAll);

router.post("/create-user", auth, adminGuard, userRepo.create.bind(userRepo));

router
  .route("/user/:id")
  .get(auth, adminGuard, userRepo.getById)
  .delete(auth, adminGuard, userRepo.delete);

router.put("/user/:id/edit", auth, adminGuard, userRepo.update.bind(userRepo));

module.exports = router;
