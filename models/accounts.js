const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  name: {
    type: String,
    uppercase: true,
    required: true,
  },
  currency: {
    type: String,
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
  description: String,
});

// one user must not have two accounts with the same name
accountSchema.index({ name: 1, belongsTo: 1 }, { unique: true });

module.exports = mongoose.model("Account", accountSchema);
