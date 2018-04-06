const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../config/keys')


passport.use(
  new GoogleStrategy({
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      // accesstoken: allows us to reach back to google and confirm we are authorized
      console.log('access token:', accessToken)
      // refreshtoken allows us to refresh the token and be re-authorized
      console.log('refresh token:', refreshToken)
      // all the info we need
      console.log('profile:', profile)
    }
  )
)
