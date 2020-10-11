const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username:{ type: String }, // 用户名称
    comment: { // 用户名评论信息
        type: String
    },
    article: {type: mongoose.SchemaTypes.ObjectId, ref: 'Article' } ,// 关联评论
}, {
    timestamps: true // 创建时间
})


module.exports = mongoose.model('Comment', schema)