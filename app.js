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
const Category = require('./models/category.js')

const app = express()

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/', (req, res) => {
  return Record.find()
    .populate('categoryId', { icon: true }) // 利用categoryID與category collection做關聯，option{ icon:true }顯示特定欄位，不填整包丟進去
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      let totalAmount = 0
      // 將UTC時間format為yyyy-MM-dd
      records.forEach(record => {
        record.date = record.date.toLocaleDateString()
        totalAmount += record.amount
      })

      res.render('index', { records, totalAmount })
    })
    .catch(error => console.log(error))
})

app.get('/new', (req, res) => {
  res.render('new')
})

app.post('/records/new', (req, res) => {
  const { name, date, category, amount } = req.body
  // 取出對應category資料
  return Category.findOne({ name: category })
    .then(category => {
      const categoryId = category._id
      // 將對應的categoryId塞進Record
      return Record.create({ name, date, amount, categoryId })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

app.get('/records/:_id/edit', (req, res) => {
  res.render('edit')
})

app.put('/records/:_id', (req, res) => {
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