const express = require("express");
const router = express.Router();

const { incomeRepository } = require("../public/js/income_repository");
const incomeRepo = new incomeRepository();

const { expenseRepository } = require("../public/js/expense_repository");
const expenseRepo = new expenseRepository();

const { categoryRepository } = require("../public/js/category_repository");
const categoryRepo = new categoryRepository();

const { accountRepository } = require("../public/js/account_repository");
const accountRepo = new accountRepository();

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

const { userGuard } = require("../guards");
const { auth } = require("../auth");

router.get("/", auth, userGuard, (req, res) => {
  res.send("Welcome to user home page");
});

router.get(
  "/:id/account/:accountId/expense/:expenseId",
  auth,
  userGuard,
  expenseRepo.getById
);

router.get(
  "/:id/account/:accountId/income/:incomeId",
  auth,
  userGuard,
  incomeRepo.getById
);

router.get(
  "/:id/account/:accountId/expenses",
  auth,
  userGuard,
  expenseRepo.getAll
);

router.get(
  "/:id/account/:accountId/incomes",
  auth,
  userGuard,
  incomeRepo.getAll
);

router.get("/:id/categories", auth, userGuard, categoryRepo.getAll);

router.get("/:id/category/:categoryId", auth, userGuard, categoryRepo.getById);

router.get(
  "/:id/income-categories",
  auth,
  userGuard,
  categoryRepo.getAllIncomeCategories
);

router.get(
  "/:id/expense-categories",
  auth,
  userGuard,
  categoryRepo.getAllExpenseCategories
);

router.get("/:id/accounts", auth, userGuard, accountRepo.getAll);

router.get(
  "/:id/account/:accountId",
  auth,
  userGuard,
  accountRepo.getById.bind(accountRepo)
);

// create requests
router.post(
  "/:id/account/:accountId/income-create",
  auth,
  userGuard,
  incomeRepo.create
);

router.post(
  "/:id/account/:accountId/expense-create",
  auth,
  userGuard,
  expenseRepo.create
);

router.post("/:id/category-create", auth, userGuard, categoryRepo.create);

router.post("/:id/account-create", auth, userGuard, accountRepo.create);

// update requests
router.put(
  "/:id/account/:accountId/income/:incomeId",
  auth,
  userGuard,
  incomeRepo.update
);

router.put(
  "/:id/account/:accountId/expense/:expenseId",
  auth,
  userGuard,
  expenseRepo.update
);

router.put(
  "/:id/category/:categoryId",
  auth,
  userGuard,
  categoryRepo.update.bind(categoryRepo)
);

router.put(
  "/:id/account/:accountId",
  auth,
  userGuard,
  accountRepo.update.bind(accountRepo)
);

// delete requests
router.delete(
  "/:id/account/:accountId/expense-delete/:expenseId",
  auth,
  userGuard,
  expenseRepo.delete
);

router.delete(
  "/:id/account/:accountId/income-delete/:incomeId",
  auth,
  userGuard,
  incomeRepo.delete
);

router.delete(
  "/:id/category-delete/:categoryId",
  auth,
  userGuard,
  categoryRepo.delete.bind(categoryRepo)
);

router.delete(
  "/:id/account-delete/:accountId",
  auth,
  userGuard,
  accountRepo.delete.bind(accountRepo)
);

module.exports = router;
