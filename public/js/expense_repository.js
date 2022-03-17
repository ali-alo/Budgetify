const fs = require("fs");

const { getUserById } = require("./user_repository");

class expenseRepository {
  constructor() {
    this.usersDb = [];

    fs.readFile("./data/users.json", (err, data) => {
      if (!err) this.usersDb = JSON.parse(data);
    });
  }

  create(userId, expense, callback) {
    const user = getUserById(this.usersDb, userId);
    expense.id = this.setId(user);
    expense.amount = parseFloat(expense.amount);
    user.expenses.push(expense);
    user.balance -= expense.amount;
    this.updateDB(callback);
  }

  getAll(userId) {
    const user = getUserById(this.usersDb, userId);
    return user.expenses;
  }

  getUserById(userId, expenseId) {
    const user = getUserById(this.usersDb, userId);
    return user.expenses.find((expense) => expense.id === expenseId);
  }

  update(userId, expenseUpdated, callback) {
    const user = getUserById(this.usersDb, userId);

    // change the data type from string to numeric
    expenseUpdated.id = parseInt(expenseUpdated.id);
    expenseUpdated.amount = parseFloat(expenseUpdated.amount);

    const index = user.expenses.findIndex(
      (expense) => expense.id == expenseUpdated.id
    );
    if (index >= 0) {
      user.expenses[index] = expenseUpdated;
      this.updateDB(callback);
    } else callback(true);
  }

  delete(userId, expenseId, callback) {
    const user = getUserById(this.usersDb, userId);
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

  updateDB(callback) {
    fs.writeFile("./data/users.json", JSON.stringify(this.usersDb), callback);
  }
}

module.exports.expenseRepository = expenseRepository;
