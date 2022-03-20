const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    validate: {
      validator: (v) => v > 0,
      message: "Amount must be greater than 0",
    },
  },
  categoryId: {
    type: mongoose.ObjectId,
    ref: "Account",
    required: true,
  },
  accountId: {
    type: mongoose.ObjectId,
    ref: "Account",
    required: true,
  },
  comment: String,
});

module.exports = mongoose.model("Expense", expenseSchema);
