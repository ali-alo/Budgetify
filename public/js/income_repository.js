const fs = require("fs");

class incomeRepository {
  constructor() {
    this.usersDb = [];
    this.user = [];

    fs.readFile("./data/users.json", (err, data) => {
      if (!err) this.usersDb = JSON.parse(data);
    });
  }

  create(userId, income, callback) {
    const user = this.getUserById(userId);
    income.id = this.setId(user);
    user.incomes.push(income);
    user.balance += income.amount;
    this.updateDB(callback);
  }

  getAll(userId) {
    const user = this.getUserById(userId);
    return user.incomes;
  }

  getById(userId, incomeId) {
    const user = this.getUserById(userId);
    return user.incommes.find((income) => income.id === incomeId);
  }

  update(userId, incomeUpdated, callback) {
    const user = this.getUserById(userId);
    incomeUpdated.id = parseInt(incomeUpdated.id);

    const index = user.incomes.findIndex((income) => {
      return income.id === incomeUpdated.id;
    });
    if (index >= 0) {
      user.incomes[index] = incomeUpdated;
      this.updateDB(callback);
    } else callback(true);
  }

  delete(userId, incomeId, callback) {
    const user = this.getUserById(userId);
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

  getUserById(id) {
    return this.usersDb.find((user) => user.id === id);
  }

  updateDB(callback) {
    fs.writeFile("./data/users.json", JSON.stringify(this.usersDb), callback);
  }
}

module.exports.incomeRepository = incomeRepository;
