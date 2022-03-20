const Category = require("../../models/categories");

const { setCategory, deleteCategory } = require("./user_repository");

class categoryRepository {
  constructor() {}

  // create function
  async create(name, type, belongsTo, callback) {
    try {
      const category = new Category({ name, type, belongsTo });
      await category.save();
      await setCategory(belongsTo, category._id);
      callback("Category was added");
    } catch (e) {
      callback(e.message);
    }
  }

  // get functions
  async getAll(userId) {
    try {
      return await Category.find().where("belongsTo").equals(userId);
    } catch (e) {
      console.log(e);
      return e.message;
    }
  }

  async getAllIncomeCategories(userId) {
    try {
      return await Category.find()
        .where("belongsTo")
        .equals(userId)
        .where("type")
        .equals("Income");
    } catch (e) {
      console.log(e);
      return e.message;
    }
  }

  async getAllExpenseCategories(userId) {
    try {
      return await Category.find()
        .where("belongsTo")
        .equals(userId)
        .where("type")
        .equals("Expense");
    } catch (e) {
      console.log(e);
      return e.message;
    }
  }

  async getById(userId, categoryId) {
    try {
      return await Category.findById(categoryId)
        .where("belongsTo")
        .equals(userId);
    } catch (e) {
      console.log(e);
      return e.message;
    }
  }

  // update function
  async update(userId, categoryId, name, type, callback) {
    try {
      const category = await this.getById(userId, categoryId);
      category.name = name;
      category.type = type;
      await category.save();
      callback("Category is updaed");
    } catch (e) {
      console.log(e);
      callback(e.message);
    }
  }

  // delete function
  async delete(userId, categoryId, callback) {
    try {
      const category = await this.getById(userId, categoryId);
      if (category) {
        await deleteCategory(userId, categoryId);
        await category.delete();
        callback(`${category.name} category is deleted from your profile`);
      } else callback(`You do not have ${category.name} category`);
    } catch (e) {
      console.log(e);
      callback(e.meessage);
    }
  }
}

async function findCategory(id) {
  return await Category.findById(id);
}

module.exports = { categoryRepository, findCategory };
