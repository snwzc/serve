const DB = require('../../common/database')
const config = require('../../../config')
const Sequelize = require('sequelize')
const moment = require('moment')
// DB.sync()
User = DB.define('user', {
    // auto increment, primaryKey, unique
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    },
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    isDelete: Sequelize.INTEGER,// 0 删除状态 1 正常
    enablePassword: Sequelize.STRING,
    createdAt: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
        }
    },
    updatedAt: {
        type: Sequelize.DATE,
        get() {
            return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
        }
    }
}, {
    freezeTableName: true,
    schema: config.database.schema,
    timestamps: true
})


module.exports = User
