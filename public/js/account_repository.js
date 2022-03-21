const Account = require("../../models/accounts");

const { setAccount, deleteAccount } = require("./user_repository");

class accountRepository {
  constructor() {}

  async create(name, belongsTo, callback) {
    try {
      const account = await new Account({ name, belongsTo });
      await account.save();
      await setAccount(belongsTo, account._id);
      callback("Account was added");
    } catch (e) {
      console.log(e.message);
      callback(e.message);
    }
  }

  async getAll(userId) {
    try {
      return await Account.find().where("belongsTo").equals(userId);
    } catch (e) {
      console.log(e.message);
      return e.message;
    }
  }

  async getById(userId, accountId) {
    try {
      return await Account.findById(accountId)
        .where("belongsTo")
        .equals(userId);
    } catch (e) {
      console.log(e.message);
      return e.message;
    }
  }

  async update(userId, accountId, name, callback) {
    try {
      const account = await this.getById(userId, accountId);
      account.name = name;
      await account.save();
      callback(`${name} account is updated`);
    } catch (e) {
      console.log(e.message);
      callback(e.message);
    }
  }

  async delete(userId, accountId, callback) {
    try {
      const account = await this.getById(userId, accountId);
      if (account) {
        await deleteAccount(userId, accountId);
        await account.delete();
        callback(`${account.name} account is deleted from your profile`);
      } else callback(`There is no such account with the id ${accountId}`);
    } catch (e) {
      console.log(e.message);
      callback(e.message);
    }
  }
}

async function setIncome(accountId, incomeId, amount) {
  const account = await Account.findById(accountId);
  account.incomesIds.push(incomeId);
  account.balance += amount;
  await account.save();
}

async function updateBalance(accountId, differenceAmount, isIncome) {
  const account = await Account.findById(accountId);
  if (isIncome) account.balance += differenceAmount;
  else account.balance -= differenceAmount;
  await account.save();
}

async function deleteIncome(accountId, incomeId, amount) {
  const account = await Account.findById(accountId);
  const index = account.incomesIds.findIndex(
    (income) => income._id.toString() === incomeId
  );
  if (index >= 0) {
    account.incomesIds.splice(index, 1);
    account.balance -= amount;
  }
  await account.save();
}

async function setExpense(accountId, expenseId, amount) {
  const account = await Account.findById(accountId);
  account.expenses.push(expenseId);
  account.balance -= amount;
  await account.save();
}

async function deleteExpense(accountId, expenseId, amount) {
  const account = await Account.findById(accountId);
  const index = account.expenses.findIndex(
    (income) => income._id.toString() === expenseId
  );
  if (index >= 0) {
    account.expenses.splice(index, 1);
    account.balance += amount;
  }
  await account.save();
}

module.exports = {
  accountRepository,
  setIncome,
  deleteIncome,
  setExpense,
  deleteExpense,
  updateBalance,
};
