const adminGuard = async (req, res, next) => {
  const user = await req.user;

  // if a user sending a request is an admin
  if (user[0] && user[0].isAdmin) next();
  // if a user sending a request is a user
  else if (user[0]) res.json({ message: "Unauthorized" });
  // in all other cases
  else res.json({ message: "Something went wrong" });
};

const userGuard = async (req, res, next) => {
  const user = await req.user;

  // do not allow one user view another user
  if (user[0] && !user.isAdmin && user[0].id === req.params.id) next();
  else if (user[0] && user[0].id === req.params.id)
    res.json({ message: "Unauthorized for these opreations" });
  else if (user[0])
    res.json({ message: "You are not allowed to view this user" });
  else res.json({ message: "Something went wrong" });
};

module.exports = {
  adminGuard,
  userGuard,
};
