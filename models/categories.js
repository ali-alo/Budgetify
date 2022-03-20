const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    required: true,
    validate: {
      validator: (type) => type === "Income" || type === "Expense",
      message: (prop) =>
        `Category has incorrect type (${prop.value} was passed)`,
    },
  },
  belongsTo: {
    type: mongoose.ObjectId,
    ref: "User",
    required: true,
  },
});

// compound indexing
categorySchema.index({ name: 1, belongsTo: 1 }, { unique: true });

module.exports = mongoose.model("Category", categorySchema);
