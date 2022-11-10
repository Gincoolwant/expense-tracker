const express = require('express')
const router = express.Router()
const Record = require('../../models/record.js')
const Category = require('../../models/category.js')
const User = require('../../models/user.js')

router.get('/search', (req, res) => {
  const userId = req.user._id
  const categoryName = req.query.filter
  return Category.findOne({ name: categoryName })
    .then(category => {
      const categoryId = category._id
      return Record.find({ userId, categoryId })
        .populate('categoryId', { icon: true }) // 利用categoryID與category collection做關聯，option{ icon:true }顯示特定欄位，不填整包丟進去
        .lean()
        .sort({ date: 'desc' })
        .then(records => {
          let totalAmount = 0
          if (records.length) {
            records.forEach(record => {
              record.date = record.date.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' })
              totalAmount += record.amount
            })
            return res.render('index', { records, totalAmount })
          } else {
            return res.render('indexNoRecord', { totalAmount })
          }
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})


router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/new', (req, res) => {
  const userId = req.user._id
  const { name, date, category, amount } = req.body
  // 取出對應category資料
  return Category.findOne({ name: category })
    .then(category => {
      const categoryId = category._id
      // 將對應的categoryId塞進Record
      return Record.create({ name, date, amount, categoryId, userId })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

router.get('/:_id/edit', (req, res) => {
  const userId = req.user._id
  const { _id } = req.params
  return Record.findOne({ _id, userId })
    .populate('categoryId', { name: true })
    .lean()
    .then((record) => {
      // UTC時間轉為yyyy-MM-dd供input tag value使用
      record.date = record.date.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')
      res.render('edit', { record })
    })
    .catch(error => console.log(error))
})

router.put('/:_id', (req, res) => {
  const userId = req.user._id
  const { _id } = req.params
  const { name, date, category, amount } = req.body
  // 取出對應category資料
  return Category.findOne({ name: category })
    .then(category => {
      const categoryId = category._id
      // 將欲修改的資料塞回指定的Record
      return Record.findOne({ _id, userId })
        .then(record => {
          record.name = name
          record.date = date
          record.amount = amount
          record.categoryId = categoryId
          record.save()
        })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
})

router.delete('/:_id', (req, res) => {
  const userId = req.user._id
  const { _id } = req.params
  return Record.deleteOne({ _id, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router