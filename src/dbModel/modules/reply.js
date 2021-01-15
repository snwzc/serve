const DB = require('../../common/database')
const config = require('../../../config')
const Sequelize = require('sequelize')
const moment = require('moment')

const Reply = DB.define('reply', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  createId: Sequelize.INTEGER, // 创建者id
  createName: Sequelize.STRING, // 创建者姓名
  title: Sequelize.STRING, // 回复标题
  desc: Sequelize.STRING, // 描述
  v_switch: Sequelize.BOOLEAN, // 是否启用  0 未启用 1 启用
  isDelete: Sequelize.INTEGER,// 0 删除状态 1 正常
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
  schema:config.database.schema,
  timestamps: true
})


module.exports = Reply
