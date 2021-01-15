const md5 = require('md5.js')


// 设置返回格式
const MSG = {
    '200': "success",
    "404": "not find",
    "403": '参数错误'
}

const resData = ({ data, msg, code = 200 } = {}) => {
    return {
        code,
        msg,
        data
    }
}

const MD5 = (value) => {
    if (!MD5) return '传入参数不正确'
    return new md5().update(value).digest('hex')
}

// cookies  设置
const setCookie = (ctx, name, value, options) => {
    return ctx.cookies.set(name, value, options)
}

const getCookie = (ctx, name) => {
    return ctx.cookies.get(name)
}

module.exports = {
    resData,
    MD5,
    setCookie,
    getCookie
}