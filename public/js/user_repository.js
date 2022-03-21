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

  async create(req, res) {
    try {
      const { name, surname, email, country, password, passwordConfirm, dob } =
        req.body;
      if (password === passwordConfirm) {
        if (this.validatePassword(password)) {
          const user = new User({
            name,
            surname,
            email,
            country,
            password: bcrypt.hashSync(password, 10),
            dob,
          });
          await user.save();
          res.json(`${name} ${surname} is added`);
        } else
          res.json(
            "Passowrd must be eight or more characters long and contain at least one uppercase letter, one lowecase letter,one number and one special character"
          );
      } else {
        res.json("Passwords do not match");
      }
    } catch (e) {
      res.json(e.message);
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const { name, surname, email, country, password, passwordConfirm, dob } =
        req.body;
      const user = await User.findById(id);
      if (password === passwordConfirm) {
        if (this.validatePassword(password)) {
          user.name = name;
          user.surname = surname;
          user.email = email;
          user.country = country;
          user.password = bcrypt.hashSync(password, 10);
          user.dob = dob;
          await user.save();
          res.json(`${user.name} ${user.surname} is updated`);
        } else
          res.json(
            "Passowrd must be eight or more characters long and contain at least one uppercase letter, one lowecase letter, one number and one special character"
          );
      } else {
        res.json("Passwords do not match");
      }
    } catch (e) {
      console.log(e);
      res.json(e.message);
    }
  }

  async delete(req, res) {
    try {
      const user = await User.findById(req.params.id);
      console.log(user);
      if (user) {
        await user.delete();
        res.json(
          `${user.name} with the id ${req.params.id} is deleted from the database`
        );
      } else res.json(`There is no such user with the id ${req.params.id}`);
    } catch (e) {
      res.json(e);
    }
  }

  async getAll(req, res) {
    // do not expose all the user's information, just show who is in the db
    const users = await User.find({})
      .where("isAdmin")
      .equals(false)
      .select("name")
      .select("surname")
      .select("email")
      .select("dob");
    return res.json(users);
  }

  async getById(req, res) {
    const user = await User.findById(req.params.id)
      .select("_id")
      .select("name")
      .select("surname")
      .select("email")
      .select("dob");
    res.json(user);
  }

  validatePassword(password) {
    // one digit char, one special char, one lowercase char and one uppercase char, contain minimum 8 chars
    const regExp = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (regExp.test(password)) return true;
    return false;
  }
}

async function getUserById(id) {
  return await User.findById(id);
}

async function setAccount(userId, accountId) {
  const user = await User.findById(userId);
  user.accountsIds.push(accountId);
  await user.save();
}

async function deleteAccount(userId, accountId) {
  const user = await User.findById(userId);
  const index = user.accountsIds.findIndex(
    (account) => account._id.toString() === accountId
  );
  if (index >= 0) user.accountsIds.splice(index, 1);
  await user.save();
}

async function setCategory(userId, categoryId) {
  const user = await User.findById(userId);
  user.categoriesIds.push(categoryId);
  await user.save();
}

async function deleteCategory(userId, categoryId) {
  const user = await User.findById(userId);
  const index = user.categoriesIds.findIndex(
    (category) => category._id.toString() === categoryId
  );
  if (index >= 0) user.categoriesIds.splice(index, 1);
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
