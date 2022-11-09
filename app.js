const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
mongoose.connect('mongodb+srv://alpha:camp@cluster0.0c2yjou.mongodb.net/expense-tracker?retryWrites=true&w=majority')
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb is connecting')
})

const Record = require('./models/record.js')

const app = express()

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  return Record.find()
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      records.forEach(record => {
        record.date = record.date.toLocaleDateString()
      })
      res.render('index', { records })
    })
    .catch(error => console.log(error))
})

app.get('/new', (req, res) => {
  res.render('new')
})

app.post('/records/new', (req, res) => {
  const { name, date, category, amount } = req.body
  return Record.create({ name, date, category, amount })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/records/:_id/edit', (req, res) => {
  res.render('edit')
})

app.delete('/records/:_id', (req, res) => {
  const { _id } = req.params
  return Record.deleteOne({ _id })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

const port = 3000
// 監聽server啟動
app.listen(port, () => {
  console.log(`Server is connecting to http://localhost:${port}`)
})