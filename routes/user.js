const express = require("express");
const router = express.Router();

const { userRepository } = require("../public/js/user_repository");
const userRepo = new userRepository();

const { incomeRepository } = require("../public/js/income_repository");
const incomeRepo = new incomeRepository();

const { expenseRepository } = require("../public/js/expense_repository");
const expenseRepo = new expenseRepository();

const { categoryRepository } = require("../public/js/category_repository");
const categoryRepo = new categoryRepository();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router
  .route("/")
  .get((req, res) => {
    res.send("Welcome to user home page");
  })
  .post((req, res) => {
    userRepo.userSignIn(req.body.login, req.body.password);
    res.send(`Welcome to Budgetify ${userRepo.user.name}`);
  });

router.get("/:id/expenses", (req, res) => {
  res.json(expenseRepo.getAll(req.params.id));
});

router.get("/:id/incomes", (req, res) => {
  res.json(incomeRepo.getAll(req.params.id));
});

router.get("/:id/categories", (req, res) => {
  res.json(categoryRepo.getAll(req.params.id));
});

router.get("/:id/income-categories", (req, res) => {
  res.json(categoryRepo.getAllIncomeCategories(req.params.id));
});

router.get("/:id/expense-categories", (req, res) => {
  res.json(categoryRepo.getAllExpenseCategories(req.params.id));
});

// create requests
router.post("/:id/income-create", (req, res) => {
  const income = {
    amount: req.body.amount,
    category: req.body.category,
    description: req.body.description,
  };
  incomeRepo.create(req.params.id, income, (err) => {
    if (err) res.json("Something went wrong");
    else res.json(incomeRepo.getAll(req.params.id));
  });
});

router.post("/:id/expense-create", (req, res) => {
  const expense = {
    amount: req.body.amount,
    category: req.body.category,
    description: req.body.description,
  };
  expenseRepo.create(req.params.id, expense, (err) => {
    if (err) res.json("Something went wrong");
    else res.json(expenseRepo.getAll(req.params.id));
  });
});

router.post("/:id/category-create", (req, res) => {
  const category = { name: req.body.name, type: req.body.type };
  categoryRepo.create(req.params.id, category, (err) => {
    if (err) res.json("Something went wrong");
    else res.json(categoryRepo.getAll(req.params.id));
  });
});

// update requests
router.put("/:id/income/:incomeId", (req, res) => {
  const income = {
    id: req.params.incomeId,
    amount: req.body.amount,
    category: req.body.category,
    description: req.body.description,
  };
  incomeRepo.update(req.params.id, income, (err) => {
    if (err) res.json("Something went wrong");
    else res.json(incomeRepo.getAll(req.params.id));
  });
});

router.put("/:id/expense/:expenseId", (req, res) => {
  const expense = {
    id: req.params.expenseId,
    amount: req.body.amount,
    category: req.body.category,
    description: req.body.description,
  };
  expenseRepo.update(req.params.id, expense, (err) => {
    if (err) res.json("Something went wrong");
    else res.json(expenseRepo.getAll(req.params.id));
  });
});

router.put("/:id/category/:categoryId", (req, res) => {
  const category = {
    id: req.params.categoryId,
    name: req.body.name,
    type: req.body.type,
  };
  categoryRepo.update(req.params.id, category, (err) => {
    if (err) res.json("Something went wrong");
    else res.json(categoryRepo.getAll(req.params.id));
  });
});

// delete requests
router.delete("/:id/expense-delete/:expenseId", (req, res) => {
  expenseRepo.delete(req.params.id, req.params.expenseId, (err) => {
    if (err) res.json("Something went wrong");
    else res.json(expenseRepo.getAll(req.params.id));
  });
});

router.delete("/:id/income-delete/:incomeId", (req, res) => {
  incomeRepo.delete(req.params.id, req.params.incomeId, (err) => {
    if (err) res.json("Something went wrong");
    else res.json(incomeRepo.getAll(req.params.id));
  });
});

router.delete("/:id/category-delete/:categoryId", (req, res) => {
  categoryRepo.delete(req.params.id, req.params.categoryId, (err) => {
    if (err) res.json("Something went wrong");
    else res.json(categoryRepo.getAll(req.params.id));
  });
});

module.exports = router;
