const Expense = require("../../models/expenses");

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
      const { title, categoryIds, comment, paymentDate } = req.body;
      const amount = parseFloat(req.body.amount);
      const expense = new Expense({
        title,
        amount,
        categoryIds,
        accountId,
        paymentDate,
        comment,
      });
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
      const { title, categoryIds, comment } = req.body;
      const amount = parseFloat(req.body.amount);
      const expense = await Expense.findById(expenseId);
      const differenceAmount = amount - expense.amount;
      expense.title = title;
      expense.amount = amount;
      expense.categoryIds = categoryIds;
      expense.comment = comment;
      expense.updateDate = new Date();
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

  async getExpenseStatistics(req, res) {
    console.log(req.params);
    const expenses = await Expense.find()
      .where("accountId")
      .equals(req.params.accountId);

    console.log(expenses);
    let total = 0;
    expenses.forEach((expense) => {
      total += expense.amount;
    });

    return res.json(expenses);
  }
}

module.exports.expenseRepository = expenseRepository;
