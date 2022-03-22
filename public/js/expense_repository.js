const Expense = require("../../models/expenses");
const users = require("../../models/users");

const {
  setExpense,
  deleteExpense,
  updateBalance,
} = require("./account_repository");

class expenseRepository {
  constructor() {}

  async create(req, res) {
    try {
      const accountId = req.params.accountId;
      const { categoryId, comment } = req.body;
      const amount = parseFloat(req.body.amount);
      const expense = new Expense({ amount, categoryId, accountId, comment });
      await expense.save();
      setExpense(accountId, expense._id, amount);
      res.json("Expense was added");
    } catch (e) {
      res.json(e.message);
    }
  }

  async getAll(req, res) {
    try {
      const expenses = await Expense.find()
        .where("accountId")
        .equals(req.params.accountId);
      res.json(expenses);
    } catch (e) {
      res.json(e.message);
    }
  }

  async getById(req, res) {
    const expense = await Expense.findById(req.params.expenseId);
    res.json(expense);
  }

  async update(req, res) {
    try {
      const { accountId, expenseId } = req.params;
      const { categoryId, comment } = req.body;
      const amount = parseFloat(req.body.amount);
      const expense = await Expense.findById(expenseId);
      const differenceAmount = amount - expense.amount;
      expense.amount = amount;
      expense.categoryId = categoryId;
      expense.comment = comment;
      await expense.save();
      await updateBalance(accountId, differenceAmount, false);
      res.json("Expense was updated");
    } catch (e) {
      res.json(e.message);
    }
  }

  async delete(req, res) {
    try {
      const { accountId, expenseId } = req.params;
      const expense = await Expense.findById(expenseId);
      if (expense) {
        deleteExpense(accountId, expenseId, expense.amount);
        await expense.delete();
        res.json("Expense was deleted");
      } else res.json(`Expense with the id ${expenseId} does not exist`);
    } catch (e) {
      res.json(e.message);
    }
  }
}

module.exports.expenseRepository = expenseRepository;
