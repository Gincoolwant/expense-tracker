const express = require('express')
const router = express.Router()
const Record = require('../../models/record.js')
const Category = require('../../models/category.js')
const User = require('../../models/user.js')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { email, password, confirmPassword } = req.body
  let name = req.body.name
  if (!name) {
    name = email.slice(0, email.indexOf('@'))
  }
  return User.findOne({ email })
    .then(user => {
      if (user) {
        return res.render('register', { name, email, password, confirmPassword })
      }
      return User.create({ name, email, password })
       .then(() => res.redirect('/users/login'))
       .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
})

router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) console.log(err)
    return res.redirect('/users/login')
  })
})

module.exports = router