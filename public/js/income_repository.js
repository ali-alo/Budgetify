const Income = require("../../models/incomes");

const {
  setIncome,
  deleteIncome,
  updateBalance,
} = require("./account_repository");

class incomeRepository {
  constructor() {}

  async create(amount, accountId, categoryId, comment, callback) {
    try {
      amount = parseFloat(amount);

      const income = new Income({
        amount,
        categoryId,
        accountId,
        comment,
      });
      await income.save();
      setIncome(accountId, income._id, amount);
      callback("Income was added");
    } catch (e) {
      console.log(e);
      callback(e.message);
    }
  }

  async getAll(accountId) {
    try {
      return await Income.find().where("accountId").equals(accountId);
    } catch (e) {
      console.log(e);
      return e.message;
    }
  }

  async getById(incomeId) {
    return await Income.findById(incomeId);
  }

  async update(incomeId, accountId, amount, categoryId, comment, callback) {
    try {
      amount = parseFloat(amount);
      const income = await this.getById(incomeId);
      const differenceAmount = amount - income.amount;
      income.amount = amount;
      income.categoryId = categoryId;
      income.comment = comment;
      await income.save();
      await updateBalance(accountId, differenceAmount, true);
      callback("Income was updated");
    } catch (e) {
      console.log(e);
      callback(e.message);
    }
  }

  async delete(accountId, incomeId, callback) {
    try {
      const income = await this.getById(incomeId);
      if (income) {
        deleteIncome(accountId, incomeId, income.amount);
        await income.delete();
        callback("Income was deleted");
      } else callback(`Income with the id ${incomeId} does not exist`);
    } catch (e) {
      console.log(e);
      callback(e.message);
    }
  }
}

module.exports.incomeRepository = incomeRepository;
