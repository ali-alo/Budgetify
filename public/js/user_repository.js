const fs = require("fs");
const bcrypt = require("bcrypt");

class userRepository {
  constructor() {
    this.usersDb = [];

    fs.readFile("./data/users.json", (err, data) => {
      if (!err) this.usersDb = JSON.parse(data);
    });
  }

  signIn(login, password, callback) {
    const user = this.usersDb.find(
      (user) =>
        user.login === login && bcrypt.compareSync(password, user.password)
    );
    callback(user);
  }

  findByLogin(login) {
    return this.usersDb.find((user) => user.login === login);
  }

  create(user, passwordConfirm, callback) {
    if (this.areInputsValid(user, passwordConfirm)) {
      user.id = this.generateRandomId();
      user.password = bcrypt.hashSync(passwordConfirm, 10);
      user.balance = 0;
      user.incomes = [];
      user.expenses = [];
      user.categories = [];
      user.isAdmin = false;
      this.usersDb.push(user);
      this.updateDB(callback);
    } else callback(true);
  }

  update(userUpdated, passwordConfirm, callback) {
    if (this.areInputsValid(userUpdated, passwordConfirm)) {
      userUpdated.password = bcrypt.hashSync(passwordConfirm, 10);

      userUpdated.isAdmin = false;
      userUpdated.balance = parseFloat(userUpdated.balance);

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
    // do not show admins
    const usersOnly = this.usersDb.filter((user) => !user.isAdmin);
    return usersOnly.map((user) => {
      // do not expose all the user's information, just show who is in the db
      return {
        name: user.name,
        login: user.login,
        id: user.id,
        balance: user.balance,
      };
    });
  }

  getById(id) {
    return this.usersDb.find((user) => user.id === id);
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

function getUserById(db, id) {
  return db.find((user) => user.id === id);
}

module.exports = { userRepository, getUserById };
