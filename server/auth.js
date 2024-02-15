require('dotenv').config({ path: '.env.local'})
const { User } = require('./db')
const { makeJWTVerifyUser } = require('./libs/validateData')
const { emailVerification } = require('./controllers/mailer.controller')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, NEXT_PUBLIC_PATH_BACK, NEXT_PUBLIC_PATH_FRONT } = process.env

passport.use( new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `http://localhost:3000/api/auth/google/callback`,
    passReqToCallback: true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    const { displayName, email } = profile
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { name: displayName, email }
    })
    if (created) {
      const tokenVerify = makeJWTVerifyUser({id: user.id})
      emailVerification({ token: tokenVerify, email: user.email})
    }
    return done(null, user)
  }
));

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})