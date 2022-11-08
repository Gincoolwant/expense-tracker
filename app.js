const express = require('express')
const app = express()
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://alpha:camp@cluster0.0c2yjou.mongodb.net/todo-list?retryWrites=true&w=majority')
const db = mongoose.connection

db.on('error',() => {
  console.log('mongodb error')
})

db.once('open',() => {
  console.log('mongodb is connecting')
})


app.get('/', (req, res) => {
  res.send('ok')
})

const port = 3000
// 監聽server啟動
app.listen(port, () => {
  console.log(`Server is connecting to http://localhost:${port}`)
})