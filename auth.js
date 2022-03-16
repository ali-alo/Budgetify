const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");

const { jwtCallback } = require("./passport");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET_TOKEN,
};

passport.use(new JwtStrategy(opts, jwtCallback));

const auth = passport.authenticate("jwt", { session: false });

module.exports.auth = auth;
