
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    code: {type: String}, // 列表名称
    region: {type: String }, // 列表内容
    regionEntitys: { type: Array }
})

module.exports = mongoose.model('City', schema)