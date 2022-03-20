const bcrypt = require("bcrypt");
const User = require("../../models/users");

class userRepository {
  constructor() {}

  async signIn(email, password, callback) {
    try {
      const user = await User.findOne().where("email").equals(email);
      if (user && bcrypt.compareSync(password, user.password)) callback(user);
      else callback(false);
    } catch (e) {
      console.log(e);
      callback(false);
    }
  }

  async findByEmail(email) {
    return await User.findByEmail(email);
  }

  async create(name, surname, email, password, passwordConfirm, dob, callback) {
    try {
      if (password === passwordConfirm) {
        const user = new User({
          name,
          surname,
          email,
          password: bcrypt.hashSync(password, 10),
          dob,
        });
        await user.save();
        callback(`${name} ${surname} is added`);
      } else {
        callback("Passwords do not match");
      }
    } catch (e) {
      callback(e.message);
    }
  }

  async update(
    id,
    name,
    surname,
    email,
    password,
    passwordConfirm,
    dob,
    callback
  ) {
    try {
      const user = await this.getById(id);
      if (password === passwordConfirm) {
        user.name = name;
        user.surname = surname;
        user.email = email;
        user.password = bcrypt.hashSync(password, 10);
        user.dob = dob;
        await user.save();
        callback(`${user.name} ${user.surname} is updated`);
      } else {
        callback("Passwords do not match");
      }
    } catch (e) {
      callback(e.message);
    }
  }

  async delete(id, callback) {
    try {
      const user = await this.getById(id);
      if (user) {
        await user.delete();
        callback(`${user.name} with the id ${id} is deleted from the database`);
      } else callback(`There is no such user with the id ${id}`);
    } catch (e) {
      callback(e);
    }
  }

  async getAll() {
    // do not expose all the user's information, just show who is in the db
    return await User.find({})
      .where("isAdmin")
      .equals(false)
      .select("name")
      .select("surname")
      .select("email")
      .select("dob");
  }

  async getById(id) {
    return await User.findById(id)
      .select("_id")
      .select("name")
      .select("surname")
      .select("email")
      .select("dob");
  }
}

async function getUserById(id) {
  return await User.findById(id);
}

async function setAccount(userId, accountId) {
  const user = await User.findById(userId);
  user.accounts.push(accountId);
  await user.save();
}

async function deleteAccount(userId, accountId) {
  const user = await User.findById(userId);
  const index = user.accounts.findIndex(
    (account) => account._id.toString() === accountId
  );
  if (index >= 0) user.accounts.splice(index, 1);
  await user.save();
}

async function setCategory(userId, categoryId) {
  const user = await User.findById(userId);
  user.categories.push(categoryId);
  await user.save();
}

async function deleteCategory(userId, categoryId) {
  const user = await User.findById(userId);
  const index = user.categories.findIndex(
    (category) => category._id.toString() === categoryId
  );
  if (index >= 0) user.categories.splice(index, 1);
  await user.save();
}

module.exports = {
  userRepository,
  getUserById,
  setAccount,
  deleteAccount,
  setCategory,
  deleteCategory,
};
