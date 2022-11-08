const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://alpha:camp@cluster0.0c2yjou.mongodb.net/todo-list?retryWrites=true&w=majority')
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb is connecting')
})

const app = express()

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

const port = 3000
// 監聽server啟動
app.listen(port, () => {
  console.log(`Server is connecting to http://localhost:${port}`)
})