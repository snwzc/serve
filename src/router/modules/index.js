module.exports = {
    "/": {
        method: 'get',
        fn: (ctx) => {
            ctx.body = 'index /.'
        }
    }
}