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
  async (req, res) => {
    res.json(await expenseRepo.getById(req.params.expenseId));
  }
);

router.get(
  "/:id/account/:accountId/income/:incomeId",
  auth,
  userGuard,
  async (req, res) => {
    res.json(await incomeRepo.getById(req.params.incomeId));
  }
);

router.get(
  "/:id/account/:accountId/expenses",
  auth,
  userGuard,
  async (req, res) => {
    res.json(await expenseRepo.getAll(req.params.accountId));
  }
);

router.get(
  "/:id/account/:accountId/incomes",
  auth,
  userGuard,
  async (req, res) => {
    res.json(await incomeRepo.getAll(req.params.accountId));
  }
);

router.get("/:id/categories", auth, userGuard, async (req, res) => {
  res.json(await categoryRepo.getAll(req.params.id));
});

router.get("/:id/category/:categoryId", auth, userGuard, async (req, res) => {
  res.json(await categoryRepo.getById(req.params.id, req.params.categoryId));
});

router.get("/:id/income-categories", auth, userGuard, async (req, res) => {
  res.json(await categoryRepo.getAllIncomeCategories(req.params.id));
});

router.get("/:id/expense-categories", auth, userGuard, async (req, res) => {
  res.json(await categoryRepo.getAllExpenseCategories(req.params.id));
});

router.get("/:id/accounts", auth, userGuard, async (req, res) => {
  res.json(await accountRepo.getAll(req.params.id));
});

router.get("/:id/account/:accountId", auth, userGuard, async (req, res) => {
  res.json(await accountRepo.getById(req.params.id, req.params.accountId));
});

// create requests
router.post(
  "/:id/account/:accountId/income-create",
  auth,
  userGuard,
  (req, res) => {
    const { amount, categoryId, comment } = req.body;
    incomeRepo.create(
      amount,
      req.params.accountId,
      categoryId,
      comment,
      (msg) => {
        res.json(msg);
      }
    );
  }
);

router.post(
  "/:id/account/:accountId/expense-create",
  auth,
  userGuard,
  (req, res) => {
    const { amount, categoryId, comment } = req.body;
    expenseRepo.create(
      amount,
      req.params.accountId,
      categoryId,
      comment,
      (msg) => {
        res.json(msg);
      }
    );
  }
);

router.post("/:id/category-create", auth, userGuard, (req, res) => {
  const { name, type } = req.body;
  categoryRepo.create(name, type, req.params.id, (msg) => {
    res.json(msg);
  });
});

router.post("/:id/account-create", auth, userGuard, (req, res) => {
  accountRepo.create(req.body.name, req.params.id, (msg) => {
    res.json(msg);
  });
});

// update requests
router.put(
  "/:id/account/:accountId/income/:incomeId",
  auth,
  userGuard,
  (req, res) => {
    const { accountId, incomeId } = req.params;
    const { amount, categoryId, comment } = req.body;
    incomeRepo.update(
      incomeId,
      accountId,
      amount,
      categoryId,
      comment,
      (msg) => {
        res.json(msg);
      }
    );
  }
);

router.put(
  "/:id/account/:accountId/expense/:expenseId",
  auth,
  userGuard,
  (req, res) => {
    const { accountId, expenseId } = req.params;
    const { amount, categoryId, comment } = req.body;
    expenseRepo.update(
      expenseId,
      accountId,
      amount,
      categoryId,
      comment,
      (msg) => {
        res.json(msg);
      }
    );
  }
);

router.put("/:id/category/:categoryId", auth, userGuard, (req, res) => {
  categoryRepo.update(
    req.params.id,
    req.params.categoryId,
    req.body.name,
    req.body.type,
    (msg) => {
      res.json(msg);
    }
  );
});

router.put("/:id/account/:accountId", auth, userGuard, (req, res) => {
  accountRepo.update(
    req.params.id,
    req.params.accountId,
    req.body.name,
    (msg) => {
      res.json(msg);
    }
  );
});

// delete requests
router.delete(
  "/:id/account/:accountId/expense-delete/:expenseId",
  auth,
  userGuard,
  (req, res) => {
    expenseRepo.delete(req.params.accountId, req.params.expenseId, (msg) => {
      res.json(msg);
    });
  }
);

router.delete(
  "/:id/account/:accountId/income-delete/:incomeId",
  auth,
  userGuard,
  (req, res) => {
    incomeRepo.delete(req.params.accountId, req.params.incomeId, (msg) => {
      res.json(msg);
    });
  }
);

router.delete(
  "/:id/category-delete/:categoryId",
  auth,
  userGuard,
  (req, res) => {
    categoryRepo.delete(req.params.id, req.params.categoryId, (msg) => {
      res.json(msg);
    });
  }
);

router.delete("/:id/account-delete/:accountId", auth, userGuard, (req, res) => {
  accountRepo.delete(req.params.id, req.params.accountId, (msg) => {
    res.json(msg);
  });
});

module.exports = router;
