const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')
// const passport = require('passport')
require('./configs/mongoose')

const iconSelected = require('./iconHelper')
const routes = require('./routes/index')
const usePassport = require('./configs/passport')

const app = express()

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(session({ secret: 'ck', resave: false, saveUninitialized: true }))

usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  next()
})
app.use(routes)

const port = 3000
// 監聽server啟動
app.listen(port, () => {
  console.log(`Server is connecting to http://localhost:${port}`)
})