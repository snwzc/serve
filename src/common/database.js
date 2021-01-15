const Sequelize = require('sequelize')
const config = require('../../config')
// 连接数据库
const DB = new Sequelize(config.database.sequelize);


// 数据库连接测试
DB.authenticate().then(res => {
    // console.log('数据库连接成功');
    // DB.sync()
}).catch(err => {
    console.log('数据库连接错误');
    console.log(err);
})

module.exports = DB;