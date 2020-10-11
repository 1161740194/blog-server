const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    title: { // 文章标题
        type: String
    },
    body: { // 文章内容
        type: String
    },
    username: { type: String }, // 关联的分类
    category: {type: mongoose.SchemaTypes.ObjectId, ref: 'Category' } // 关联的分类

},{
    timestamps: true // 创建时间
})

const articleNodel = mongoose.model('Article', schema)
module.exports = articleNodel