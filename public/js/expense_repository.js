const fs = require("fs");

class expenseRepository {
  constructor() {
    this.usersDb = [];
    this.user = [];

    fs.readFile("./data/users.json", (err, data) => {
      if (!err) this.usersDb = JSON.parse(data);
    });
  }

  create(userId, expense, callback) {
    const user = this.getUserById(userId);
    expense.id = this.setId(user);
    user.expenses.push(expense);
    user.balance -= expense.amount;
    this.updateDB(callback);
  }

  getAll(userId) {
    const user = this.getUserById(userId);
    return user.expenses;
  }

  getById(userId, expenseId) {
    const user = this.getUserById(userId);
    return user.expenses.find((expense) => expense.id === expenseId);
  }

  update(userId, expenseUpdated, callback) {
    const user = this.getUserById(userId);
    expenseUpdated.id = parseInt(expenseUpdated.id);

    const index = user.expenses.findIndex(
      (expense) => expense.id == expenseUpdated.id
    );
    if (index >= 0) {
      user.expenses[index] = expenseUpdated;
      this.updateDB(callback);
    } else callback(true);
  }

  delete(userId, expenseId, callback) {
    const user = this.getUserById(userId);
    const index = user.expenses.findIndex((expense) => expense.id == expenseId);
    if (index >= 0) {
      user.expenses.splice(index, 1);
      this.updateDB(callback);
    } else callback(true);
  }

  setId(user) {
    if (user.expenses.length === 0) return 1;
    else return user.expenses[user.expenses.length - 1].id + 1;
  }

  getUserById(id) {
    return this.usersDb.find((user) => user.id === id);
  }

  updateDB(callback) {
    fs.writeFile("./data/users.json", JSON.stringify(this.usersDb), callback);
  }
}

module.exports.expenseRepository = expenseRepository;
