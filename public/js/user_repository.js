const fs = require("fs");

class userRepository {
  constructor() {
    this.usersDb = [];

    fs.readFile("./data/users.json", (err, data) => {
      if (!err) this.usersDb = JSON.parse(data);
    });
  }

  create(user, passwordConfirm, callback) {
    if (this.areInputsValid(user, passwordConfirm)) {
      user.id = this.generateRandomId();
      user.balance = 0;
      user.incomes = [];
      user.expenses = [];
      user.categories = [];
      this.usersDb.push(user);
      this.updateDB(callback);
    } else callback(true);
  }

  update(userUpdated, passwordConfirm, callback) {
    if (this.areInputsValid(userUpdated, passwordConfirm)) {
      const index = this.getIndex(userUpdated.id, callback);
      this.usersDb[index] = userUpdated;
      this.updateDB(callback);
    } else callback(true);
  }

  delete(id, callback) {
    const index = this.getIndex(id, callback);
    if (index >= 0) {
      this.usersDb.splice(index, 1);
      this.updateDB(callback);
    } else {
      callback(true);
    }
  }

  getAll() {
    return this.usersDb;
  }

  getById(id) {
    return this.usersDb.filter((user) => user.id === id);
  }

  getIndex(id, callback) {
    const index = this.usersDb.findIndex((user) => user.id === id);
    if (index >= 0) return index;
    callback(true);
  }

  areInputsValid(user, passwordConfirm) {
    if (
      user.password.trim().length > 4 &&
      user.name.trim().length > 2 &&
      user.login.trim().length > 4 &&
      user.password === passwordConfirm
    )
      return true;
    return false;
  }

  updateDB(callback) {
    fs.writeFile("./data/users.json", JSON.stringify(this.usersDb), callback);
  }

  generateRandomId() {
    return Math.random().toString(36).slice(2);
  }
}

module.exports.userRepository = userRepository;
