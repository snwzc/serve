const { verifyToken } = require('../utils/jwt')
const { resData } = require('./index')
const { authCookieName } = require('../../config')
const { User } = require('../dbModel')

// 过滤不被验证的api
const authFilter = ['/api/user/login', '/api/user/getCaptcha', '/api/user/add']

module.exports = async (ctx, next) => {
    const path = ctx.path
    if (authFilter.includes(path)) {
        await next()
    } else {
        const token = ctx.cookies.get(authCookieName)
        if (!token) return ctx.body = resData({ code: 404, msg: 'error token not find' })
        // 验证token
        const data = await verifyToken(token).catch(err => {
            ctx.body = resData({ code: 401, msg: '登录过期重新登录' })
        })
        
        if (data) {
            const userData = await User.findOne({
                where: { id: data.id }
            })
            if (userData.isDelete == 0) {
                return ctx.body = resData({ msg: '用户被禁用,联系管理人员', code: 403 })
            }
            await next()
        }

    }


}