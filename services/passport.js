const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')

// Used to get the mongo user details from the authentication
// Useful in case we have more ways to sign in (google, fb, email etc)

// Gets the user id from the user
passport.serializeUser((user, done) => {
  done(null, user.id);
})

// Gets the user from the id
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
})

passport.use(
  new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      // accesstoken: allows us to reach back to google and confirm we are authorized
      // refreshtoken allows us to refresh the token and be re-authorized
      // all the info we need
      const existingUser = await User.findOne({ googleId: profile.id })
      if(existingUser) {
        done(null, existingUser);
        // Do something
      } else {
        const user = await new User({ googleId: profile.id })
        done(null, user)
      }
    }
  )
)
