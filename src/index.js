const express = require('express')
const app = express()
const history = require('connect-history-api-fallback')

// 啓用JSON格式

app.use(express.json())
// 允许跨域
app.use(require('cors')())


app.use(history())
app.use('/', express.static(__dirname + '/../web'))

// 鏈接數據庫
require('./plugins/db')(app)
require('./route/articles')(app)
require('./route/admin/router')(app)
app.listen(3010, () => {
    console.log('http://localhost:3010')
})