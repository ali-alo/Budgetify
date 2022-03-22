const Income = require("../../models/incomes");

const {
  setIncome,
  deleteIncome,
  updateBalance,
} = require("./account_repository");

class incomeRepository {
  constructor() {}

  async create(req, res) {
    try {
      const accountId = req.params.accountId;
      const { categoryId, comment } = req.body;
      const amount = parseFloat(req.body.amount);

      const income = new Income({
        amount,
        categoryId,
        accountId,
        comment,
      });
      await income.save();
      setIncome(accountId, income._id, amount);
      res.json("Income was added");
    } catch (e) {
      res.json(e.message);
    }
  }

  async getAll(req, res) {
    try {
      const incomes = await Income.find()
        .where("accountId")
        .equals(req.params.accountId);
      res.json(incomes);
    } catch (e) {
      res.json(e.message);
    }
  }

  async getById(req, res) {
    const income = await Income.findById(req.params.incomeId);
    res.json(income);
  }

  async update(req, res) {
    try {
      const { accountId, incomeId } = req.params;
      const { categoryId, comment } = req.body;
      const amount = parseFloat(req.body.amount);
      const income = await Income.findById(incomeId);
      const differenceAmount = amount - income.amount;
      income.amount = amount;
      income.categoryId = categoryId;
      income.comment = comment;
      await income.save();
      await updateBalance(accountId, differenceAmount, true);
      res.json("Income was updated");
    } catch (e) {
      res.json(e.message);
    }
  }

  async delete(req, res) {
    try {
      const { accountId, incomeId } = req.params;
      const income = await Income.findById(incomeId);
      if (income) {
        deleteIncome(accountId, incomeId, income.amount);
        await income.delete();
        res.json("Income was deleted");
      } else res.json(`Income with the id ${incomeId} does not exist`);
    } catch (e) {
      res.json(e.message);
    }
  }
}

module.exports.incomeRepository = incomeRepository;
