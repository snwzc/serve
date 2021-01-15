
// 全局配置文件
const dev = require('./config.dev')
const pro = require('./config.pro')
const local = require('./config.local')

const NODE_ENV = process.env.NODE_ENV

const { logger } = require('./log.config')
let ob = {}

if (NODE_ENV == 'pro') {
    ob = pro
} else if (NODE_ENV == 'local') {
    ob = local
} else {
    ob = dev
}
logger.info('环境变量相关' + JSON.stringify(ob))

module.exports = {
    port: process.env.PROT || 3000,
    authCookieName: 'QHADMINID',
    // token 过期时间
    tokenTimeout: '24h',
    // 加密key
    tokenKey: 'sk9plHEIhtC14zu5',
    // 遍历配置项
    ...ob
}