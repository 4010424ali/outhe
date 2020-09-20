const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');

const config = require('../config');
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const response = await User.findById(id);
  done(null, response);
});
console.log('hello woeld');
passport.use(
  new GoogleStrategy(
    {
      callbackURL: '/auth/google/redirect',
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
    },
    async (accessToken, resfrshToken, profile, done) => {
      const currentUser = await User.findOne({ googleId: profile.id });
      if (currentUser) {
        console.log(currentUser);

        done(null, currentUser);
      } else {
        const newUser = await User.create({
          username: profile.displayName,
          googleId: profile.id,
          email: profile.emails[0].value,
        });

        done(null, newUser);

        console.log('New User is Created ' + newUser);
      }
    }
  )
);
