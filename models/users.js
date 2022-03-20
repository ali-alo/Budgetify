const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
    min: "1922-01-01",
    // users must be at least 18 years old
    max: `${new Date().getFullYear() - 18}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`,
  },

  accounts: {
    type: [mongoose.ObjectId],
    ref: "Account",
  },
  categories: {
    type: [mongoose.ObjectId],
    ref: "Category",
  },
  isAdmin: { type: Boolean, default: false },
});

userSchema.statics.findByEmail = function (email) {
  return this.find({ email });
};

module.exports = mongoose.model("User", userSchema);
