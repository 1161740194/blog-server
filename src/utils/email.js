/*
封装一个发送邮件的模块
调用传递参数的方式  来到达到简化调用
*/
const nodemailer = require('nodemailer');
//创建发送邮件的对象
let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com', // 运营商选择   qq   网易
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "1161740194@qq.com", // 发送方的邮箱
        pass: 'zelwpdgcwmgobaef' //   pop3 授权码 **百度如何获取吧**
    }
});

function send(mail, code) {
    //邮件内容
    let mailObj = {
        from: '"Fred Foo ?" <1161740194@qq.com>', // 发送方邮箱
        to: mail, // list of receivers
        subject: '欢迎注册√', // Subject line
        text: `1902`, // plain text body
        html: `欢迎注册beater博客,验证码为:${code},有效期为五分钟.` // html body   
    }
    //发送邮件
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailObj, (error, data) => {
           if (error) {
               reject(error)
           } else {
                resolve()
           }
        });
    })
   
}
module.exports = {send: send};