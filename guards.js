const adminGuard = async (req, res, next) => {
  const user = await req.user;

  // if a user sending a request is an admin
  if (user && user.isAdmin) next();
  // if a user sending a request is a user
  else if (user) res.json({ message: "Unauthorized" });
  // in all other cases
  else res.json({ message: "Something went wrong" });
};

const userGuard = async (req, res, next) => {
  const user = await req.user;

  // do not allow one user view another user
  if (user && user.id === req.params.id) next();
  else if (user) res.json({ message: "You are not allowed to view this user" });
  else res.json({ message: "Something went wrong" });
};

module.exports = {
  adminGuard,
  userGuard,
};
