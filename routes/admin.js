const express = require("express");
const router = express.Router();

const { userRepository } = require("../public/js/user_repository");
const userRepo = new userRepository();

const { adminGuard } = require("../guards");
const { auth } = require("../auth");

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/", auth, adminGuard, (req, res) => {
  res.send("Welcome to admin home page");
});

router.get("/view-users", auth, adminGuard, async (req, res) => {
  res.json(await userRepo.getAll());
});

router.post("/create-user", auth, adminGuard, (req, res) => {
  const { name, surname, email, password, passwordConfirm, dob } = req.body;
  userRepo.create(
    name,
    surname,
    email,
    password,
    passwordConfirm,
    dob,
    (msg) => {
      res.json(msg);
    }
  );
});

router
  .route("/user/:id")
  .get(auth, adminGuard, async (req, res) => {
    const user = await userRepo.getById(req.params.id);
    res.json(user);
  })
  .delete(auth, adminGuard, async (req, res) => {
    await userRepo.delete(req.params.id, (msg) => {
      res.json(msg);
    });
  });

router.put("/user/:id/edit", auth, adminGuard, (req, res) => {
  const id = req.params.id;
  const { name, surname, email, password, passwordConfirm, dob } = req.body;

  userRepo.update(
    id,
    name,
    surname,
    email,
    password,
    passwordConfirm,
    dob,
    (msg) => {
      res.json(msg);
    }
  );
});

module.exports = router;
