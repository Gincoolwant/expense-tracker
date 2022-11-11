const mongoose = require('mongoose')
// 連線至DB
mongoose.connect(process.env.MONGODB_URI)
// 取得連線狀況
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb is connecting')
})

module.exports = db