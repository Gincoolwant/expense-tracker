const express = require('express')
const router = express.Router()
const Record = require('../../models/record.js')
const Category = require('../../models/category.js')
const User = require('../../models/user.js')

router.get('/', (req, res) => {
  const userId = req.user._id
  return Record.find({userId})
    .populate('categoryId', { icon: true }) // 利用categoryID與category collection做關聯，option{ icon:true }顯示特定欄位，不填整包丟進去
    .lean()
    .sort({ date: 'desc' })
    .then(records => {
      let totalAmount = 0
      if (records.length) {
        // 將UTC時間format為yyyy-MM-dd
        records.forEach(record => {
          record.date = record.date.toLocaleDateString(undefined, { year: 'numeric', month: '2-digit', day: '2-digit' })
          totalAmount += record.amount
        })
        res.render('index', { records, totalAmount })
      } else {
        res.render('indexNoRecord', { totalAmount })
      }
    })
    .catch(error => console.log(error))
})

module.exports = router