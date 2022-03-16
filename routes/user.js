const express = require("express");
const router = express.Router();

const { incomeRepository } = require("../public/js/income_repository");
const incomeRepo = new incomeRepository();

const { expenseRepository } = require("../public/js/expense_repository");
const expenseRepo = new expenseRepository();

const { categoryRepository } = require("../public/js/category_repository");
const categoryRepo = new categoryRepository();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

const { userGuard } = require("../guards");
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

router.get("/", auth, userGuard, (req, res) => {
  res.send("Welcome to user home page");
});

router.get("/:id/expenses", auth, userGuard, (req, res) => {
  res.json(expenseRepo.getAll(req.params.id));
});

router.get("/:id/incomes", auth, userGuard, (req, res) => {
  res.json(incomeRepo.getAll(req.params.id));
});

router.get("/:id/categories", auth, userGuard, (req, res) => {
  res.json(categoryRepo.getAll(req.params.id));
});

router.get("/:id/income-categories", auth, userGuard, (req, res) => {
  res.json(categoryRepo.getAllIncomeCategories(req.params.id));
});

router.get("/:id/expense-categories", auth, userGuard, (req, res) => {
  res.json(categoryRepo.getAllExpenseCategories(req.params.id));
});

// create requests
router.post("/:id/income-create", auth, userGuard, (req, res) => {
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

router.post("/:id/expense-create", auth, userGuard, (req, res) => {
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

router.post("/:id/category-create", auth, userGuard, (req, res) => {
  const category = { name: req.body.name, type: req.body.type };
  categoryRepo.create(req.params.id, category, (err) => {
    if (err) res.json("Something went wrong");
    else res.json(categoryRepo.getAll(req.params.id));
  });
});

// update requests
router.put("/:id/income/:incomeId", auth, userGuard, (req, res) => {
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

router.put("/:id/expense/:expenseId", auth, userGuard, (req, res) => {
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

router.put("/:id/category/:categoryId", auth, userGuard, (req, res) => {
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
router.delete("/:id/expense-delete/:expenseId", auth, userGuard, (req, res) => {
  expenseRepo.delete(req.params.id, req.params.expenseId, (err) => {
    if (err) res.json("Something went wrong");
    else res.json(expenseRepo.getAll(req.params.id));
  });
});

router.delete("/:id/income-delete/:incomeId", auth, userGuard, (req, res) => {
  incomeRepo.delete(req.params.id, req.params.incomeId, (err) => {
    if (err) res.json("Something went wrong");
    else res.json(incomeRepo.getAll(req.params.id));
  });
});

router.delete(
  "/:id/category-delete/:categoryId",
  auth,
  userGuard,
  (req, res) => {
    categoryRepo.delete(req.params.id, req.params.categoryId, (err) => {
      if (err) res.json("Something went wrong");
      else res.json(categoryRepo.getAll(req.params.id));
    });
  }
);

module.exports = router;
