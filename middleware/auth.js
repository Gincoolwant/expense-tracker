const express = require('express')
const router = express.Router()

module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    return res.redirect('/users/login')
  }
}