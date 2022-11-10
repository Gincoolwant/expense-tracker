const express = require('express')
const router = express.Router()

module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning-msg', '請登入使用。')
    return res.redirect('/users/login')
  }
}