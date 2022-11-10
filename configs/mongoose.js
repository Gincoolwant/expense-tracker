const mongoose = require('mongoose')
// 連線至DB
mongoose.connect('mongodb+srv://alpha:camp@cluster0.0c2yjou.mongodb.net/expense-tracker?retryWrites=true&w=majority')
// 取得連線狀況
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb is connecting')
})

module.exports = db