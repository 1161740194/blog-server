/*
    登陸接口
*/
module.exports = app => {
    const express = require('express')
    const router = express.Router()
    // 注册登陆
    const User = require('../../models/user')
    const jwt = require('jsonwebtoken')
    const nodeEmail = require('../../utils/email')
    // 自定义的密码串
    const Secret = 'dal;fkajl;gjo;a'
    // 发送验证码
    let codes = {}

    /*
        登陆注册

    */
    router.post('/getMailCode', async (req, res) => {
        let { mail }= req.body
        // 随机验证码
        let code = parseInt(Math.random() * 10000)
        const email = await User.findOne({
            mail
        })
        
        if (!email) {
             // 判断邮箱是否存在
             if (mail) {
             return nodeEmail.send(mail, code).then(() => {
                     // 存到本地内存
                     codes[mail] = code
                    console.log(codes)
                    // 发送成功
                    res.send({error: 0, message: '验证码发送成功'})
                })
                .catch((error) => {
                    // 发送失败
                  res.send({error: -1, message: '验证码发送失败'})
                })
            }
        }
        
        // 判断邮箱是否已经注册过
        if (mail === email.mail) {
            res.send({error: -1, message: '此邮箱已被注册过'})
        } 
        
    })
    
    // 注册
    router.post('/register', async (req, res) => {
        // 获取前端发过来的数据
        const {username, password, mail, code} = req.body
        // 如果code则添加到数据库
       if (codes[mail] == code) {
            await User.create({
                username, password, mail
            })
            res.send({
                code: 0,
                message: "注册成功"
            })
       } else {
           res.send({
                code: 1,
               message: "验证码错误"
           })
       }
    })

    // 登陸接口
    router.post('/login', async (req, res) => {
        // 產看用戶名是否存在
        const user = await User.findOne({
            username: req.body.username
        })
        if (!user) {
            return res.send({
                status: 422,
                message: '用戶不存在'
            })
        }
        // 查看密碼是否正確
        const ispwd = require('bcryptjs').compareSync(req.body.password, user.password)
        if (!ispwd) {
            return res.send({
                status: 422,
                message: '密碼錯誤'
            })
        }
        // 添加token
        const token = jwt.sign({
            id: user._id
        }, Secret)
        res.send({
            status: 200,
            user,
            token,
            message: '登陆成功'
        })
    })

    // 检查用户名是否存在
    router.post('/userName', async (req, res) => {
        const user = await User.findOne({
            username: req.body.username
        })
        // 如果用户名不存在返回可用
        if (!user) {
            return res.send({
                code: 0,
                message: "用户名可用"
            })
        }
        // 如果用户名存在返回不可用
        const {
            username
        } = user
        if (req.body.username === username) {
            return res.send({
                code: 1,
                message: "用户名已存在"
            })
        }
    })

    // 通过token查找用户
    router.post('/findUser', async (req, res) => {
        const raw = String(req.headers.authorization).split(' ').pop()
        // 把token转换成对象并取出id
        const {
            id
        } = jwt.verify(raw, Secret)
        // 通过id查找用户信息
        const user = await User.findById(id)
        res.send({
            status: 200,
            user
        })
    })

    app.use('/api', router)

}