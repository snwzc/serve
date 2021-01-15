const koa = require('koa')
const app = new koa()

const bodyparser = require('koa-bodyparser')
const static = require('koa-static')
const session = require("koa-session")

const { resData } = require('./src/common')

const { logger } = require('./config/log.config')
const config = require('./config')
const sessionConfig = require("./config/session")


const router = require('./src/router')


// 数据库
require('./src/common/database')

// bodyparser
app.use(bodyparser())
// koa static
app.use(static(__dirname + '/public'))
// session cookie 密钥
app.keys = ["qhSystem"]
app.use(session(sessionConfig, app))


// log
app.use(async (ctx, next) => {
    logger.info(ctx.path)
    await next()
})

// l路由
app.use(router.routes()).use(router.allowedMethods());


// 404
app.use(async (ctx, next) => {
    if (!ctx.body) {
        ctx.body = resData({ code: 404, msg: "not find 404" })
    }
    await next()
})





app.listen(config.port, (err) => {
    if (err) console.log('error');
})