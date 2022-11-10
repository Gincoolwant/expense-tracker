const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const iconSelected = require('./iconHelper')
require('./config/mongoose')
const routes = require('./routes/index')

const app = express()

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(routes)

const port = 3000
// 監聽server啟動
app.listen(port, () => {
  console.log(`Server is connecting to http://localhost:${port}`)
})