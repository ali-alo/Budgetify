const fs = require("fs");

const { getUserById } = require("./user_repository");

class incomeRepository {
  constructor() {
    this.usersDb = [];

    fs.readFile("./data/users.json", (err, data) => {
      if (!err) this.usersDb = JSON.parse(data);
    });
  }

  create(userId, income, callback) {
    const user = getUserById(this.usersDb, userId);
    income.id = this.setId(user);
    income.amount = parseFloat(income.amount);
    user.incomes.push(income);
    user.balance += income.amount;
    this.updateDB(callback);
  }

  getAll(userId) {
    const user = getUserById(this.usersDb, userId);
    return user.incomes;
  }

  getById(userId, incomeId) {
    const user = getUserById(this.usersDb, userId);
    return user.incommes.find((income) => income.id === incomeId);
  }

  update(userId, incomeUpdated, callback) {
    const user = getUserById(this.usersDb, userId);

    // change the data type from string to numeric
    incomeUpdated.id = parseInt(incomeUpdated.id);
    incomeUpdated.amount = parseFloat(incomeUpdated.amount);
    const index = user.incomes.findIndex((income) => {
      return income.id === incomeUpdated.id;
    });
    if (index >= 0) {
      user.incomes[index] = incomeUpdated;
      this.updateDB(callback);
    } else callback(true);
  }

  delete(userId, incomeId, callback) {
    const user = getUserById(this.usersDb, userId);
    const index = user.incomes.findIndex((income) => income.id == incomeId);
    if (index >= 0) {
      user.incomes.splice(index, 1);
      this.updateDB(callback);
    } else callback(true);
  }

  setId(user) {
    if (user.incomes.length === 0) return 1;
    else return user.incomes[user.incomes.length - 1].id + 1;
  }

  updateDB(callback) {
    fs.writeFile("./data/users.json", JSON.stringify(this.usersDb), callback);
  }
}

module.exports.incomeRepository = incomeRepository;
