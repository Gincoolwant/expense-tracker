const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
const flash = require('connect-flash')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const iconSelected = require('./public/javaScripts/iconHelper')
const usePassport = require('./configs/passport')
const routes = require('./routes/index')
require('./configs/mongoose')

const app = express()

app.use(express.static('public'))
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }))
app.use(flash())

usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success-msg')
  res.locals.warning_msg = req.flash('warning-msg')
  res.locals.error = req.flash('error')

  next()
})
app.use(routes)

const PORT = process.env.PORT
// 監聽server啟動
app.listen(PORT, () => {
  console.log(`Server is connecting to http://localhost:${PORT}`)
})