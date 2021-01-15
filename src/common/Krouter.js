const router = require('koa-router')


module.exports = (module, modulePath = '') => {
    if (!module || Array.isArray(module)) return console.log('module参数错误！');

    // 创建子路由
    const Router = new router({
        prefix: modulePath
    })

    for (const key in module) {
        const item = module[key];
        Router[item.method](key, item.fn)
    }

    return Router

}