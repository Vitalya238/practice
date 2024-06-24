const passport = require('passport');
const { Strategy: JwtStrategy } = require('passport-jwt');
const User = require('./models/userModel');
const jwtSecret = process.env.JWT_SECRET;


const cookieExtractor = req => {
  let jwt = null 

  if (req && req.cookies) {
      jwt = req.cookies['access-token']
  }

  return jwt
}

const jwtOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: jwtSecret
};

passport.use(new JwtStrategy(
  jwtOptions,
  async (payload, done) => {
    try {
      const user = await User.findOne({ where: { id: payload.sub } });

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }
));

module.exports = passport;
