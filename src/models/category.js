
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: {type: String}, // 列表名称
    parent: {type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }, // 列表内容
    list: { type: String }
})

// 显示子列表
schema.virtual('children', {
    localField: '_id',
    foreignField: 'parent',
    justOne: false,
    ref: 'Category'
  })

module.exports = mongoose.model('Category', schema)