const mongoose = require('mongoose')
const categoryList = require('./category.json').results
mongoose.connect('mongodb+srv://alpha:camp@cluster0.0c2yjou.mongodb.net/expense-tracker?retryWrites=true&w=majority')
const db = mongoose.connection
const Category = require('../category.js')

db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  Promise.all(
    categoryList.map(category => {
      const { name, icon } = category
      return Category.create({ name, icon })
    })
  )
    .then(() => {
      console.log('category seeder done.')
      process.exit()
    })
    .catch(error => console.log(error))
})