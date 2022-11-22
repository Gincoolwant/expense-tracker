const passport = require('passport')
const LocalStrategy = require('passport-local')
const FacebookStrategy = require('passport-facebook')
const GoogleStrategy = require('passport-google-oauth20')
const Record = require('../models/record')
const Category = require('../models/category')
const User = require('../models/user.js')
const bcrypt = require('bcryptjs')

module.exports = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      if (!email || !password) return done(null, false, { message: '請輸入Email及password。' })
      User.findOne({ email })
        .then(user => {
          // 無效email登入嘗試，flash msg提示
          if (!user) return done(null, false, { message: '請輸入有效Email。' })
          // 比對bcrypt，相同則登入，不相同flash msg提示
          return bcrypt.compare(password, user.password)
            .then((isMatch) => {
              if (!isMatch) return done(null, false, { message: '請確認Email或密碼是否正確。' })
              return done(null, user)
            })
        })
        .catch(err => done(err))
    })
  )

  passport.use(
    new FacebookStrategy({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK_URL,
      profileFields: ['email', 'displayName']
    }, (accessToken, refreshToken, profile, done) => {
      const { name, email } = profile._json
      return User.findOne({ email })
        .then(user => {
          if (user) return done(null, user)
          // 密碼必填，產生一組隨機密碼for auth登入者
          const randomPassword = Math.random().toString(36).slice(-8)
          return bcrypt.genSalt(10)
            .then(salt => bcrypt.hash(randomPassword, salt))
            .then(hash => {
              return User.create({ name, email, password: hash })
                .then(() => done(null, user))
                .catch(err => done(err))
            })
            .then(user => done(null, user))
            .catch(err => done(err))
        })
        .catch(err => done(err))
    })
  )

  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    profileFields: ['email', 'displayName']
  }, (accessToken, refreshToken, profile, done) => {
    const { name, email } = profile._json
    return User.findOne({ email })
      .then(user => {
        if (user) return done(null, user)
         // 密碼必填，產生一組隨機密碼for auth登入者
        const randomPassword = Math.random().toString(36).slice(-8)
        return bcrypt.genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => {
            return User.create({ name, email, password: hash })
              .then(() => done(null, user))
              .catch(err => done(err))
          })
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