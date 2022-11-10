const passport = require('passport')
const LocalStrategy = require('passport-local')
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