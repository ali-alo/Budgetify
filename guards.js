const { userRepository } = require("./public/js/user_repository");
const userRepo = new userRepository();

const adminGuard = (req, res, next) => {
  const user = userRepo.getById(req.user.id);

  // if a user sending a request is an admin
  if (user && user.isAdmin) next();
  // if a user sending a request is a user
  else if (user) res.json({ message: "Unauthorized" });
  // in all other cases
  else res.json({ message: "Something went wrong" });
};

const userGuard = (req, res, next) => {
  const user = userRepo.getById(req.user.id);

  if (user && !user.isAdmin) next();
  else if (user) res.json({ message: "Unauthorized for these opreations" });
  else res.json({ message: "Something went wrong" });
};

module.exports = {
  adminGuard,
  userGuard,
};
