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
  country: {
    type: String,
    required: true,
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

  accountsIds: {
    type: [mongoose.ObjectId],
    ref: "Account",
  },
  categoriesIds: {
    type: [mongoose.ObjectId],
    ref: "Category",
  },
  isAdmin: { type: Boolean, default: false },
});

userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email });
};

module.exports = mongoose.model("User", userSchema);
