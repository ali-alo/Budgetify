const fs = require("fs");

class userRepository {
  constructor() {
    this.usersDb = [];
    this.user = [];

    fs.readFile("./data/users.json", (err, data) => {
      if (!err) this.usersDb = JSON.parse(data);
    });
  }

  userSignIn(login, password) {
    this.user = this.usersDb.find(
      (user) => user.login === login && user.password === password
    );
  }

  // create functions
  createIncome(userId, income, callback) {
    const user = this.getUserById(userId);
    income.id = this.setIncomeId(user);
    user.incomes.push(income);
    user.balance += income.amount;
    this.updateDB(callback);
  }

  createExpense(userId, expense, callback) {
    const user = this.getUserById(userId);
    expense.id = this.setExpenseId(user);
    user.expenses.push(expense);
    user.balance -= expense.amount;
    this.updateDB(callback);
  }

  createIncomeCategory(userId, category, callback) {
    const user = this.getUserById(userId);
    category.id = this.setIncomeCategoryId(user);
    user.incomeCategories.push(category);
    this.updateDB(callback);
  }

  createExpenseCategory(userId, category, callback) {
    const user = this.getUserById(userId);
    category.id = this.setExpenseCategoryId(user);
    user.expenseCategories.push(category);
    this.updateDB(callback);
  }

  // get functions
  getAllIncomes(userId) {
    const user = this.getUserById(userId);
    return user.incomes;
  }

  getAllExpenses(userId) {
    const user = this.getUserById(userId);
    return user.expenses;
  }

  getAllIncomeCategories(userId) {
    const user = this.getUserById(userId);
    return user.incomeCategories;
  }

  getAllExpenseCategories(userId) {
    const user = this.getUserById(userId);
    return user.expenseCategories;
  }

  // update functions
  updateIncome(userId, incomeUpdated, callback) {
    const user = this.getUserById(userId);
    const index = user.incomes.findIndex((income) => {
      return income.id == incomeUpdated.id;
    });
    if (index >= 0) {
      user.incomes[index] = incomeUpdated;
      this.updateDB(callback);
    } else callback(true);
  }

  updateExpense(userId, expenseUpdated, callback) {
    const user = this.getUserById(userId);
    const index = user.expenses.findIndex(
      (expense) => expense.id == expenseUpdated.id
    );
    if (index >= 0) {
      user.expenses[index] = expenseUpdated;
      this.updateDB(callback);
    } else callback(true);
  }

  updateIncomeCategory(userId, incomeCategoryUpdated, callback) {
    const user = this.getUserById(userId);
    const index = user.incomeCategories.findIndex(
      (category) => category.id == incomeCategoryUpdated.id
    );
    if (index >= 0) {
      user.incomeCategories[index] = incomeCategoryUpdated;
      this.updateDB(callback);
    } else callback(true);
  }

  updateExpenseCategory(userId, expenseCategoryUpdated, callback) {
    const user = this.getUserById(userId);
    const index = user.expenseCategories.findIndex(
      (category) => category.id == expenseCategoryUpdated.id
    );
    if (index >= 0) {
      user.expenseCategories[index] = expenseCategoryUpdated;
      this.updateDB(callback);
    } else callback(true);
  }

  // delete functions
  deleteExpense(userId, expenseId, callback) {
    const user = this.getUserById(userId);
    const index = user.expenses.findIndex((expense) => expense.id == expenseId);
    if (index >= 0) {
      user.expenses.splice(index, 1);
      this.updateDB(callback);
    } else callback(true);
  }

  deleteIncome(userId, incomeId, callback) {
    const user = this.getUserById(userId);
    const index = user.incomes.findIndex((income) => income.id == incomeId);
    if (index >= 0) {
      user.incomes.splice(index, 1);
      this.updateDB(callback);
    } else callback(true);
  }

  deleteIncomeCategory(userId, incomeCategoryId, callback) {
    const user = this.getUserById(userId);
    const index = user.incomeCategories.findIndex(
      (category) => category.id == incomeCategoryId
    );
    if (index >= 0) {
      user.incomeCategories.splice(index, 1);
      this.updateDB(callback);
    } else callback(true);
  }

  deleteExpenseCategory(userId, expenseCategoryId, callback) {
    const user = this.getUserById(userId);
    const index = user.expenseCategories.findIndex(
      (category) => category.id == expenseCategoryId
    );
    if (index >= 0) {
      user.expenseCategories.splice(index, 1);
      this.updateDB(callback);
    } else callback(true);
  }

  setIncomeId(user) {
    if (user.incomes.length === 0) return 1;
    else return user.incomes[user.incomes.length - 1].id + 1;
  }

  setExpenseId(user) {
    if (user.expenses.length === 0) return 1;
    else return user.expenses[user.expenses.length - 1].id + 1;
  }

  setIncomeCategoryId(user) {
    if (user.incomeCategories.length === 0) return 1;
    else return user.incomeCategories[user.incomeCategories.length - 1].id + 1;
  }

  setExpenseCategoryId(user) {
    if (user.expenseCategories.length === 0) return 1;
    else
      return user.expenseCategories[user.expenseCategories.length - 1].id + 1;
  }

  getUserById(id) {
    return this.usersDb.find((user) => user.id === id);
  }

  updateDB(callback) {
    fs.writeFile("./data/users.json", JSON.stringify(this.usersDb), callback);
  }
}

module.exports.userRepository = userRepository;
