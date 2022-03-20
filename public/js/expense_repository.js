const Expense = require("../../models/expenses");

const {
  setExpense,
  deleteExpense,
  updateBalance,
} = require("./account_repository");

class expenseRepository {
  constructor() {}

  async create(amount, accountId, categoryId, comment, callback) {
    try {
      amount = parseFloat(amount);
      const expense = new Expense({ amount, categoryId, accountId, comment });
      await expense.save();
      setExpense(accountId, expense._id, amount);
      callback("Expense was added");
    } catch (e) {
      console.log(e);
      callback(e.message);
    }
  }

  async getAll(accountId) {
    try {
      return await Expense.find().where("accountId").equals(accountId);
    } catch (e) {
      console.log(e);
      return e.message;
    }
  }

  async getById(expenseId) {
    return await Expense.findById(expenseId);
  }

  async update(expenseId, accountId, amount, categoryId, comment, callback) {
    try {
      amount = parseFloat(amount);
      const expense = await this.getById(expenseId);
      const differenceAmount = amount - expense.amount;
      expense.amount = amount;
      expense.categoryId = categoryId;
      expense.comment = comment;
      await expense.save();
      await updateBalance(accountId, differenceAmount, false);
      callback("Expense was updated");
    } catch (e) {
      console.log(e);
      callback(e.message);
    }
  }

  async delete(accountId, expenseId, callback) {
    try {
      const expense = await this.getById(expenseId);
      if (expense) {
        deleteExpense(accountId, expenseId, expense.amount);
        await expense.delete();
        callback("Expense was deleted");
      } else callback(`Expense with the id ${expenseId} does not exist`);
    } catch (e) {
      console.log(e);
      callback(e.message);
    }
  }
}

module.exports.expenseRepository = expenseRepository;
