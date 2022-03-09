const express = require("express");
const router = express.Router();

const { adminRepository } = require("../public/js/admin_repository");
const adminRepo = new adminRepository();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/", (req, res) => {
  res.send("Welcome to admin home page");
});

router.get("/view-users", (req, res) => {
  res.json(adminRepo.getAllUsers());
});

router.post("/create-user", (req, res) => {
  const user = {
    name: req.body.name,
    login: req.body.login,
    password: req.body.password,
  };
  adminRepo.createUser(user, req.body.passwordConfirm, (err) => {
    if (err) {
      res.json(adminRepo.getAllUsers());
    } else {
      res.json(user);
    }
  });
});

router
  .route("/user/:id")
  .get((req, res) => {
    res.json(adminRepo.getUserById(req.params.id));
  })
  .delete((req, res) => {
    adminRepo.deleteUser(req.params.id, (err) => {
      if (err)
        res.status(404).json({ message: "User with this id does not exist" });
      else res.send(`User with the id ${req.params.id} is deleted`);
    });
  });

router.put("/user/:id/edit", (req, res) => {
  const userUpdated = {
    id: req.params.id,
    name: req.body.name,
    login: req.body.login,
    balance: req.body.balance,
    password: req.body.password,
    incomes: req.body.incomes,
    expenses: req.body.expenses,
    incomeCategories: req.body.incomeCategories,
    expenseCategories: req.body.expenseCategories,
  };

  adminRepo.updateUser(userUpdated, req.body.passwordConfirm, (err) => {
    if (err) {
      res.status(400).json({ message: "Invalid input" });
    } else {
      res.json(adminRepo.getAllUsers());
    }
  });
});

module.exports = router;
