const fs = require('fs');

const auth = require("../common/auth")
const koaRouter = require('koa-router')
const Krouter = require('../common/Krouter')

const router = new koaRouter({
    prefix: '/api'
})


// 鉴权
router.use(auth)


function ImpFiled() {
    // 导入文件
    let files = fs.readdirSync(__dirname + '/modules')
    for (let i = 0; i < files.length; i++) {
        let element = files[i]
        let name = '/' + element.split('.')[0]
        // 引入模块
        var module = require('./modules/' + element)
        router.use(Krouter(module, name).routes())
    }
}

ImpFiled()

module.exports = router
