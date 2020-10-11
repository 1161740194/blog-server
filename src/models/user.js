/*
    user數據庫模板
*/

const mongoose = require('mongoose')

const schame = new mongoose.Schema({
    username: { type: String , unique: true},
    password: { type: String , set(val) {
        // bcryptjs使用加密
        return require('bcryptjs').hashSync(val, 10)
    } },
    mail: { type: String },
})

module.exports = mongoose.model('User', schame)