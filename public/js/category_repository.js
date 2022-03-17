const fs = require("fs");

const { getUserById } = require("./user_repository");

class categoryRepository {
  constructor() {
    this.usersDb = [];

    fs.readFile("./data/users.json", (err, data) => {
      if (!err) this.usersDb = JSON.parse(data);
    });
  }

  // create function
  create(userId, category, callback) {
    const user = getUserById(this.usersDb, userId);
    category.id = this.setId(user);
    user.categories.push(category);
    this.updateDB(callback);
  }

  // get functions
  getAll(userId) {
    const user = getUserById(this.usersDb, userId);
    return user.categories;
  }

  getAllIncomeCategories(userId) {
    const user = getUserById(this.usersDb, userId);
    return user.categories.filter((category) => category.type === "Income");
  }

  getAllExpenseCategories(userId) {
    const user = getUserById(this.usersDb, userId);
    return user.categories.filter((category) => category.type === "Expense");
  }

  // update function
  update(userId, categoryUpdated, callback) {
    const user = getUserById(this.usersDb, userId);
    categoryUpdated.id = parseInt(categoryUpdated.id);

    const index = user.categories.findIndex(
      (category) => category.id == categoryUpdated.id
    );
    if (index >= 0) {
      user.categories[index] = categoryUpdated;
      this.updateDB(callback);
    } else callback(true);
  }

  // delete function
  delete(userId, categoryId, callback) {
    const user = getUserById(this.usersDb, userId);
    const index = user.categories.findIndex(
      (category) => category.id == categoryId
    );
    if (index >= 0) {
      user.categories.splice(index, 1);
      this.updateDB(callback);
    } else callback(true);
  }

  setId(user) {
    if (user.categories.length === 0) return 1;
    else return user.categories[user.categories.length - 1].id + 1;
  }

  updateDB(callback) {
    fs.writeFile("./data/users.json", JSON.stringify(this.usersDb), callback);
  }
}

module.exports.categoryRepository = categoryRepository;
