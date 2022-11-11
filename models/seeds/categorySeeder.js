const categoryList = require('./raw/category.json').results
const db = require('../../configs/mongoose')
const Category = require('../category.js')

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