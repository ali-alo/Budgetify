const { userRepository } = require("./public/js/user_repository");
const userRepo = new userRepository();

const jwtCallback = (jwt_payload, done) => {
  const user = userRepo.findByLogin(jwt_payload.login);
  if (user) {
    return done(null, user);
  }
  return done(null, false);
};

module.exports = { jwtCallback };
