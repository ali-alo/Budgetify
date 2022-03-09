const express = require("express");
const router = express.Router();

const { userRepository } = require("../public/js/user_repository");
const userRepo = new userRepository();

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
  res.json(userRepo.getAllExpenses(req.params.id));
});

router.get("/:id/incomes", (req, res) => {
  res.json(userRepo.getAllIncomes(req.params.id));
});

router.get("/:id/income-categories", (req, res) => {
  res.json(userRepo.getAllIncomeCategories(req.params.id));
});

router.get("/:id/expense-categories", (req, res) => {
  res.json(userRepo.getAllExpenseCategories(req.params.id));
});

// create requests
router.post("/:id/income-create", (req, res) => {
  const income = {
    amount: req.body.amount,
    category: req.body.category,
    description: req.body.description,
  };
  userRepo.createIncome(req.params.id, income, (err) => {
    if (err) res.json("Something went wrong");
    else res.json(userRepo.getAllIncomes(req.params.id));
  });
});

router.post("/:id/expense-create", (req, res) => {
  const expense = {
    amount: req.body.amount,
    category: req.body.category,
    description: req.body.description,
  };
  userRepo.createExpense(req.params.id, expense, (err) => {
    if (err) res.json("Something went wrong");
    else res.json(userRepo.getAllExpenses(req.params.id));
  });
});

router.post("/:id/income-category-create", (req, res) => {
  const incomeCategory = { name: req.body.name };
  userRepo.createIncomeCategory(req.params.id, incomeCategory, (err) => {
    if (err) res.json("Something went wrong");
    else res.json(userRepo.getAllIncomeCategories(req.params.id));
  });
});

router.post("/:id/expense-category-create", (req, res) => {
  const expenseCategory = { name: req.body.name };
  userRepo.createExpenseCategory(req.params.id, expenseCategory, (err) => {
    if (err) res.json("Something went wrong");
    else res.json(userRepo.getAllExpenseCategories(req.params.id));
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
  userRepo.updateIncome(req.params.id, income, (err) => {
    if (err) res.json("Something went wrong");
    else res.json(userRepo.getAllIncomes(req.params.id));
  });
});

router.put("/:id/expense/:expenseId", (req, res) => {
  const expense = {
    id: req.params.expenseId,
    amount: req.body.amount,
    category: req.body.category,
    description: req.body.description,
  };
  userRepo.updateExpense(req.params.id, expense, (err) => {
    if (err) res.json("Something went wrong");
    else res.json(userRepo.getAllExpenses(req.params.id));
  });
});

router.put("/:id/income-category/:categoryId", (req, res) => {
  const incomeCategory = { name: req.body.name, id: req.params.categoryId };
  userRepo.updateIncomeCategory(req.params.id, incomeCategory, (err) => {
    if (err) res.json("Something went wrong");
    else res.json(userRepo.getAllIncomeCategories(req.params.id));
  });
});

router.put("/:id/expense-category/:expenseId", (req, res) => {
  const expenseCategory = { name: req.body.name, id: req.params.expenseId };
  userRepo.updateExpenseCategory(req.params.id, expenseCategory, (err) => {
    if (err) res.json("Something went wrong");
    else res.json(userRepo.getAllExpenseCategories(req.params.id));
  });
});

// delete requests
router.delete("/:id/expense-delete/:expenseId", (req, res) => {
  userRepo.deleteExpense(req.params.id, req.params.expenseId, (err) => {
    if (err) res.json("Something went wrong");
    else res.json(userRepo.getAllExpenses(req.params.id));
  });
});

router.delete("/:id/income-delete/:incomeId", (req, res) => {
  userRepo.deleteIncome(req.params.id, req.params.incomeId, (err) => {
    if (err) res.json("Something went wrong");
    else res.json(userRepo.getAllIncomes(req.params.id));
  });
});

router.delete("/:id/expense-category-delete/:expenseCategoryId", (req, res) => {
  userRepo.deleteExpenseCategory(
    req.params.id,
    req.params.expenseCategoryId,
    (err) => {
      if (err) res.json("Something went wrong");
      else res.json(userRepo.getAllExpenseCategories(req.params.id));
    }
  );
});

router.delete("/:id/income-category-delete/:incomeCategoryId", (req, res) => {
  userRepo.deleteIncomeCategory(
    req.params.id,
    req.params.incomeCategoryId,
    (err) => {
      if (err) res.json("Something went wrong");
      else res.json(userRepo.getAllIncomeCategories(req.params.id));
    }
  );
});

module.exports = router;
