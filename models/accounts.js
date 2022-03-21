const mongoose = require("mongoose");

// const Expense = require("./expenses");
// const Income = require("./incomes");
// const Category = require("./categories");

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    uppercase: true,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
  belongsTo: {
    type: mongoose.ObjectId,
    ref: "User",
    required: true,
  },
  incomesIds: {
    type: [mongoose.ObjectId],
    ref: "Income",
  },
  expensesIds: {
    type: [mongoose.ObjectId],
    ref: "Expense",
  },
});

// one user must not have two accounts with the same name
accountSchema.index({ name: 1, belongsTo: 1 }, { unique: true });

module.exports = mongoose.model("Account", accountSchema);
