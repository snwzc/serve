const { signToken } = require('../../utils/jwt')
const { authCookieName } = require('../../../config')

const { User } = require('../../dbModel')
const { resData, MD5, getCookie } = require('../../common/index')
const { logger } = require('../../../config/')
const { verifyToken } = require('../../utils/jwt')
const svgCaptcha = require('svg-captcha')

module.exports = {
    "/login": {
        method: 'post',
        fn: async ctx => {
            const { username, password, captcha } = ctx.request.body;
            const sessionCaptcha = ctx.session.captcha
            // 检查参数是否存在
            if (!username || !password || !captcha) return ctx.body = resData({ code: 403, msg: "参数错误" })
            if (!sessionCaptcha) return ctx.body = resData({ code: 403, msg: 'session not found ' })
            // 判断验证码
            if (sessionCaptcha.toLowerCase() != captcha.toLowerCase()) { return ctx.body = resData({ code: 403, msg: '验证码不正确' }) }

            // 查询用户
            let result = await User.findAll({
                where: {
                    username
                }
            })

            const data = result[0]
            if (result.length > 0) {
                if (data.password == MD5(password)) {
                    // 生成token 设置cookie 
                    const token = signToken({ username, id: data.id })
                    ctx.cookies.set(authCookieName, token)
                    ctx.body = resData({ msg: '登录成功', data: { token } })
                } else {
                    ctx.body = resData({ code: 403, msg: '用户名或密码错误' })
                }
            } else {
                ctx.body = resData({ code: 401, msg: '用户不存在' })
            }

        }
    },
    "/info": {
        method: 'get',
        fn: async ctx => {
            const token = ctx.cookies.get(authCookieName)
            const { username, id } = await verifyToken(token)
            ctx.body = resData({ data: { username, rolse: ['admin'], id } })
        }
    },
    "/updata": {
        method: 'post',
        fn: async ctx => {
            const { id, isDelete, enablePassword } = ctx.request.body

            const data = await verifyToken(getCookie(ctx, authCookieName))

            if (id && data.id == id) {
                return ctx.body = resData({ code: 403, msg: '修改失败,不能修改自己状态☺' })
            } else {
                const result = await User.update({ password: MD5(enablePassword + ''), isDelete, enablePassword, }, {
                    where: { id }
                })
                if (result) {
                    return ctx.body = resData({ code: 200 })
                } else {
                    return ctx.body = resData({ code: 500, msg: 'error' })
                }
            }

        }
    },
    "/add": {
        method: 'post',
        fn: async ctx => {
            const { username, password } = ctx.request.body
            const reg = /^[a-zA-Z][a-zA-Z0-9]{5,15}$/

            if (!username || !password) return ctx.body = resData({ code: 401, msg: '用户名或密码不能为空' })
            if (username.toString().match(reg) == null) return ctx.body = resData({ code: 401, msg: '用户名不正确重新输入,用户名最少6位,第一位不得为数字且不超过16位.' })
            let result = await User.findOne({ where: { username: username + '' } })

            if (result) return ctx.body = resData({ code: 401, msg: '用户名已存在' })
            let createResult = await User.create({
                username,
                password: MD5(password + ''),
                isDelete: 1,
                enablePassword: password
            })
            if (createResult) return ctx.body = resData({ msg: '注册成功' })

            ctx.body = resData({ code: 401, msg: '注册失败' })
        }
    },
    "/getCaptcha": {
        method: 'get',
        fn: ctx => {
            var captcha = svgCaptcha.create({
                width: 130,
                fontSize: 40,//验证码字体大小
                heigth: 40,//高度
                background: '#fff',
            });
            ctx.session.captcha = captcha.text;
            ctx.body = resData({ data: { captcha: captcha.data } })
        }
    },
    "/getUserList": {
        method: 'get',
        fn: async ctx => {
            let data = await User.findAll({
                attributes: ['id', 'username', 'isDelete', 'enablePassword', 'updatedAt']
            })
            ctx.body = resData({ code: 200, data })
        }
    },
    "/updatePwd": {
        method: 'post',
        fn: async ctx => {
            const { password, agenPassword, newPassword } = ctx.request.body

            const { id } = await verifyToken(getCookie(ctx, authCookieName))
            if (agenPassword != newPassword) return ctx.body = resData({ msg: '两次密码输入不一致', code: 403 })

            const data = await User.findOne({
                where: { id }
            })

            const newPwd = MD5(password)

            if (data.password == newPwd) {
                const result = await User.update({
                    password: MD5(agenPassword),
                    enablePassword: agenPassword
                }, {
                    where: { id }
                })

                if (result) {
                    ctx.body = resData({ msg: "修改成功" })
                } else {
                    ctx.body = resData({ msg: '修改失败', code: 403 })
                }
            } else {
                return ctx.body = resData({ msg: '旧密码错误', code: 403 })
            }


        }
    }

}
