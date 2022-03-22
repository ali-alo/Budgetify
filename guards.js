const adminGuard = async (req, res, next) => {
  const usersArr = await req.user;
  const user = usersArr[0];

  // if a user sending a request is an admin
  if (user && user.isAdmin) next();
  // if a user sending a request is a user
  else if (user) res.json({ message: "Unauthorized" });
  // in all other cases
  else res.json({ message: "Something went wrong" });
};

const userGuard = async (req, res, next) => {
  const usersArr = await req.user;
  const user = usersArr[0];

  // do not allow one user view another user
  if (user && !user.isAdmin && user.id === req.params.id) next();
  else if (user && user.id === req.params.id)
    res.json({ message: "Unauthorized for these opreations" });
  else if (user) res.json({ message: "You are not allowed to view this user" });
  else res.json({ message: "Something went wrong" });
};

module.exports = {
  adminGuard,
  userGuard,
};
