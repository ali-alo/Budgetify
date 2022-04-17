const Account = require("../../models/accounts");
const Income = require("../../models/incomes");
const Expense = require("../../models/expenses");

const { setAccount, deleteAccount } = require("./user_repository");

class accountRepository {
  constructor() {}

  async create(req, res) {
    try {
      const belongsTo = req.params.id;
      const account = new Account({
        name: req.body.name,
        belongsTo,
      });
      await account.save();
      await setAccount(belongsTo, account._id);
      res.json("Account was added");
    } catch (e) {
      res.json(e.message);
    }
  }

  async getAll(req, res) {
    try {
      const accounts = await Account.find()
        .where("belongsTo")
        .equals(req.params.id);
      res.json(accounts);
    } catch (e) {
      res.json(e.message);
    }
  }

  async getById(req, res) {
    try {
      const { id, accountId } = req.params;
      const account = await this.getAccountById(id, accountId);
      res.json(account);
    } catch (e) {
      res.json(e.message);
    }
  }

  async update(req, res) {
    try {
      const { id, accountId } = req.params;
      const account = await this.getAccountById(id, accountId);
      account.name = req.body.name;
      await account.save();
      res.json(`${account.name} account is updated`);
    } catch (e) {
      res.json(e.message);
    }
  }

  async delete(req, res) {
    try {
      const { id, accountId } = req.params;
      const account = await this.getAccountById(id, accountId);
      if (account) {
        // delete all incomes and expense of the deleted account
        await Income.deleteMany({ belongsTo: id });
        await Expense.deleteMany({ belongsTo: id });

        await deleteAccount(id, accountId);
        await account.delete();
        res.json(`${account.name} account is deleted from your profile`);
      } else res.json(`You don't have an account with the id ${accountId}`);
    } catch (e) {
      res.json(e.message);
    }
  }

  async getAccountById(userId, accountId) {
    const account = await Account.findById(accountId)
      .where("belongsTo")
      .equals(userId);
    return account;
  }
}

async function setIncome(accountId, incomeId, amount) {
  const account = await Account.findById(accountId);
  account.incomesIds.push(incomeId);
  account.balance += amount;
  await account.save();
}

async function updateBalance(accountId, differenceAmount, isIncome) {
  const account = await Account.findById(accountId);
  if (isIncome) account.balance += differenceAmount;
  else account.balance -= differenceAmount;
  await account.save();
}

async function deleteIncome(accountId, incomeId, amount) {
  const account = await Account.findById(accountId);
  const index = account.incomesIds.findIndex(
    (id) => id.toString() === incomeId
  );
  if (index >= 0) {
    account.incomesIds.splice(index, 1);
    account.balance -= amount;
  }
  await account.save();
}

async function setExpense(accountId, expenseId, amount) {
  const account = await Account.findById(accountId);
  account.expensesIds.push(expenseId);
  account.balance -= amount;
  await account.save();
}

async function deleteExpense(accountId, expenseId, amount) {
  const account = await Account.findById(accountId);
  const index = account.expensesIds.findIndex(
    (id) => id.toString() === expenseId
  );
  if (index >= 0) {
    account.expensesIds.splice(index, 1);
    account.balance += amount;
  }
  await account.save();
}

module.exports = {
  accountRepository,
  setIncome,
  deleteIncome,
  setExpense,
  deleteExpense,
  updateBalance,
};
