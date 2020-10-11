# 登陆接口Api
http://localhost:3000/api
## 用户登录
请求地址: /login
请求方式：Post
返回类型: Json
请求参数：{username: '', password: ''}
返回数据： {
    "username": "" , 
    "password": ""
}

## 用户注册

### 查看用户名是否可用
请求地址: /userName
请求方式：Post
请求参数：{username: ''}
返回类型: Json
返回数据： {
    message
}

### 获取验证码
请求地址: /getMailCode
请求方式：Post
请求参数：{username: '', password: '', mail: ''}
返回类型: Json
返回数据： {
    message: "发送成功"
}

### 用户注册
请求地址: /register
请求方式：Post
请求参数：{username: '', password: '', mail: '', code: ''}
返回类型: Json
返回数据： {
   message: "注册成功"
}

## 获取用户信息
请求地址: /findUser
请求方式：Post
请求参数：Headers authorization
返回类型: Json
返回数据：  {
    "username": "" , 
    "password": ""
}

# 博客接口Api
http://localhost:3000/api/rest
## 添加列表和子列表
请求地址: /categories
请求方式：Post
返回类型: Json
请求参数：{name: "", parent:""} // parent是上级id
返回数据： {
    "status": 200
}

## 添加文章和子列表
请求地址: /articles
请求方式：Post
返回类型: Json
请求参数：{title: "", body:"", username:"",category:""} // category是列表id
返回数据： {
    "status": 200
}

## 添加评论
请求地址: /comments
请求方式：Post
返回类型: Json
请求参数：{username: "", comment:"", article:""} // article是文章id
返回数据： {
    "status": 200
}

## 查看列表和子列表
请求地址: /categories // 查看所有
请求地址: /categories/:id // 根据parent id查看
请求方式：GET
返回类型: Json
请求参数：{id:""} // parent是上级id
返回数据： {
    "status": 200,
    {
        name: "", 
        parent:""
    }
}

## 查看一级列表和二级列表
请求地址: /categories/list/1 // 查看一级分类
请求地址: /categories/list/2 // 查看二级分类
请求地址: /categories/:id // 根据parent id查看二级分类

请求方式：GET
返回类型: Json
请求参数：{id:""} // parent是上级id
返回数据： {
    "status": 200,
    {
        name: "", 
        parent:"",
        chriden: []
    }
}

## 查看文章
请求地址: /articles // 查看所有文章
请求地址: /articles/:id // 根据列表id查看下面的文章
请求方式：GET
返回类型: Json
请求参数：{id:""} // category是列表id
返回数据： {
    "status": 200,
    {
        title: "", 
        body:"", 
        username:"",
        category:""
    }
}

## 添加评论
请求地址: /comments // 查看所有文章
请求地址: /comments/:id // 查看当前文章的评论
请求方式：GET
返回类型: Json
请求参数：{id: ""} // article是文章id
返回数据： {
    "status": 200,
    {
        username: "", comment:"", article:""
    }
}