
const { resData } = require('../../common')
const { Reply } = require('../../dbModel')

const { verifyToken } = require('../../utils/jwt')
const config = require('../../../config')
const { Op } = require("sequelize");
module.exports = {
    "/getList": {
        method: 'get',
        fn: async ctx => {
            const { size = 20, page = 1, title } = ctx.request.query
            const data = await Reply.findAndCountAll({
                where: {
                    title: { [Op.like]: '%' + title + '%' },
                    isDelete: 1
                },
                limit: size,
                offset: (page - 1) * size
            })
            ctx.body = resData({ data })
        }
    },
    "/update": {
        method: 'post',
        fn: async ctx => {
            const { id, title, desc, v_switch, isDelete } = ctx.request.body

            if (id) {//修改
                const result = await Reply.update({
                    title, desc, v_switch, isDelete
                }, { where: { id } })
                if (!result) return ctx.body = resData({ code: 403, msg: '修改失败' })

                ctx.body = resData({ msg: '修改成功' })

            } else {//添加
                const token = ctx.cookies.get(config.authCookieName)
                const { id, username } = await verifyToken(token)
                const { title, desc } = ctx.request.body

                if (!title) return ctx.body = resData({ msg: 'title 为空', code: 403 })
                if (!desc) return ctx.body = resData({ msg: 'desc 为空', code: 403 })

                const result = await Reply.create({
                    createId: id,
                    createName: username,
                    title,
                    desc,
                    v_switch: 1,//默认开启
                    isDelete: 1
                })

                if (!result) return ctx.body = resData({ code: 403, msg: '添加失败' })

                ctx.body = resData({ msg: '添加成功' })
            }

        }
    },
    "/usableList": {
        method: "get",
        fn: async ctx => {
            // 查询快捷回复列表 
            const data = await Reply.findAll({
                where: {
                    v_switch: true,
                    isDelete: 1
                }
            })
            ctx.body = resData({ data })
        }
    }
}