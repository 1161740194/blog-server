/*
    鏈接數據庫
*/
module.exports = app => {
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://127.0.0.1:27017/my-learn', {
        useUnifiedTopology: true,
        useCreateIndex: true,
        useNewUrlParser: true,
    })
}