const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')

passport.use(
  new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      // accesstoken: allows us to reach back to google and confirm we are authorized
      // refreshtoken allows us to refresh the token and be re-authorized
      // all the info we need
      User.findOne({ googleId: profile.id })
        .then((existingUser) => {
          if(existingUser) {
            // Do something
          } else {
            new User({ googleId: profile.id }).save();
          }
        })
    }
  )
)
