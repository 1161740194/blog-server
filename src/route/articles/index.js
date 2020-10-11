module.exports = app => {
    const express  = require('express')
    const router = express.Router({
        // 允许req添加字段
        mergeParams: true
    })
    // 创建文章，评论，列表
    router.post('/', async(req, res) => {
        const model = await req.Model.create(req.body)
        res.send({
            status: 200,
            model
        })
 
    })
 
    // 查看城市
    router.get('/lookcity', async(req,res) => {
        const {city} = req.query
        var reg = new RegExp(city)
        const model = await req.Model.find({
            region: {$regex: reg}
        })
        
        console.log(city)
        res.send({
            status: 200,
            model
        })
    })
    // 查看所有的文章，评论，列表
    router.get('/', async(req, res) => {
            const items = await req.Model.find().populate('children').lean()
            res.send({
                status: 200,
                items
            })
 
    })
       // 查看一级分类
    router.get('/list/:list', async(req, res) => {
        const items = await req.Model.find({ // 通过第几个列表进行查找
            list: req.params.list
        })
        res.send({
            status: 200,
            items
        })

})
     // 通过id查看文章，评论，列表
    router.get('/:id', async(req, res) => {
       // 如果是文章通过id查询
        if(req.Model.modelName === "Article" ) {
            const items = await req.Model.find({
                category: req.params.id
            })
            res.send(
                {
                    status: 200,
                    items
                })
        }
        // 如果是列表通过id查询它下面的子列表
        if(req.Model.modelName === "Category"){
            const items = await req.Model.find({
                parent: req.params.id
            }).populate('parent').lean()
            res.send({
                status: 200,
                items
            })
        }
         // 如果是评论通过article的id查询
        if(req.Model.modelName === "Comment") {
            const items = await req.Model.find({
                article: req.params.id
            })
            res.send({
                status: 200,
                items
            })
        }
        
 
    })

       // 更新资源
    router.put('/:id', async (req, res) => {
        const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
        res.send({
            status: 200,
            model
        })
    })
    // 删除资源
    router.delete('/:id', async (req, res) => {
        await req.Model.findByIdAndDelete(req.params.id)
        res.send({
            success: true
        })
    })
    
    app.use('/api/rest/:resource', async (req, res, next) => {
        const modelName = require('inflection').classify(req.params.resource)
            req.Model = require(`../../models/${modelName}`)
        next()
    }, router)
}