const Category = require("../../models/categories");

const { setCategory, deleteCategory } = require("./user_repository");

class categoryRepository {
  constructor() {}

  // create function
  async create(req, res) {
    try {
      const { name, type } = req.body;
      const belongsTo = req.params.id;
      const category = new Category({ name, type, belongsTo });
      await category.save();
      await setCategory(belongsTo, category._id);
      res.json("Category was added");
    } catch (e) {
      res.json(e.message);
    }
  }

  // get functions
  async getAll(req, res) {
    try {
      const categories = await Category.find()
        .where("belongsTo")
        .equals(req.params.id);
      res.json(categories);
    } catch (e) {
      res.json(e.message);
    }
  }

  async getAllIncomeCategories(req, res) {
    try {
      const incomeCategories = await Category.find()
        .where("belongsTo")
        .equals(req.params.id)
        .where("type")
        .equals("Income");
      res.json(incomeCategories);
    } catch (e) {
      res.json(e.message);
    }
  }

  async getAllExpenseCategories(req, res) {
    try {
      const expenseCategories = await Category.find()
        .where("belongsTo")
        .equals(req.params.id)
        .where("type")
        .equals("Expense");
      res.json(expenseCategories);
    } catch (e) {
      res.json(e.message);
    }
  }

  async getById(req, res) {
    try {
      const category = await Category.findById(req.params.categoryId)
        .where("belongsTo")
        .equals(req.params.id);
      res.json(category);
    } catch (e) {
      res.json(e.message);
    }
  }

  // update function
  async update(req, res) {
    try {
      const { id, categoryId } = req.params;
      const { name, type } = req.body;
      const category = await this.getCategoryById(id, categoryId);
      category.name = name;
      category.type = type;
      await category.save();
      res.json("Category is updaed");
    } catch (e) {
      res.json(e.message);
    }
  }

  // delete function
  async delete(req, res) {
    try {
      const { id, categoryId } = req.params;
      const category = await this.getCategoryById(id, categoryId);
      if (category) {
        await deleteCategory(id, categoryId);
        await category.delete();
        res.json(`${category.name} category is deleted from your profile`);
      } else res.json(`You do not have ${category.name} category`);
    } catch (e) {
      res.json(e.meessage);
    }
  }

  async getCategoryById(userId, categoryId) {
    const category = await Category.findById(categoryId)
      .where("belongsTo")
      .equals(userId);
    return category;
  }
}

async function findCategory(id) {
  return await Category.findById(id);
}

module.exports = { categoryRepository, findCategory };
