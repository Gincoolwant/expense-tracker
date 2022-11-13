const db = require('../../configs/mongoose')
const Category = require('../category.js')
const Record = require('../record.js')
const user = require('../user.js')
const User = require('../user.js')
const userList = require('./raw/user.json').results
const recordList = require('./raw/record.json').results
const bcrypt = require('bcryptjs')
const { findOne } = require('../user.js')
const category = require('../category.js')

db.once('open', () => {
  Promise.all(userList.map(user => {
    user.password = bcrypt.hashSync(user.password, 10)
    return User.create(user)
  }))
    .then(() => {
      Promise.all(recordList.map(record => {
        const { name, date, amount, userId, categoryId } = record // 這裡userId/categoryId = seeder中的userId(測試者1號)/category name(家居物業)
        return Category.findOne({ name: categoryId })
          .then(category => {
            const categoryId = category._id
            return User.findOne({ name: userId })
              .then(user => {
                const userId = user._id
                return Record.create({ name, date, amount, userId, categoryId })
              })
              .catch(error => console.log(error))
          })
          .catch(error => console.log(error))
      }))
        .then(() => {
          console.log('record seeder done.')
          process.exit()
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})