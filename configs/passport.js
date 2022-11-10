const passport = require('passport')
const LocalStrategy = require('passport-local')
const FacebookStrategy = require('passport-facebook')
const Record = require('../models/record')
const Category = require('../models/category')
const User = require('../models/user.js')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) return done(null, false)
          if (password !== user.password) return done(null, false)
          return done(null, user)
        })
        .catch(err => done(err))
    })
  )

  passport.use(
    new FacebookStrategy({
      clientID: '1167949027408753',
      clientSecret: 'a01bd7f3dfc363839ff2fe6f07d3f7cb',
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['email', 'displayName']
    }, (accessToken, refreshToken, profile, done) => {
      const { name, email } = profile._json
      return User.findOne({ email })
        .then(user => {
          if (user) return done(null, user)
          const randomPassword = Math.random().toString(36).slice(-8)
          return User.create({ name, email, password: randomPassword })
            .then(user => done(null, user))
            .catch(err => done(err))
        })
        .catch(err => done(err))
    })
  )

  passport.serializeUser((user, done) => {
    return done(null, user.id)
  })

  passport.deserializeUser((id, done) => {
    return User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err))
  })
}