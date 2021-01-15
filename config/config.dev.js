
// 测试地址配置
module.exports = {
    database: {
        schema: 'car_net_admin',
        sequelize: {
            dialect: 'postgres',         // 数据库类型
            host: 'rm-m5e297m11ox7xb3s6do.pg.rds.aliyuncs.com',
            port: 3433,
            username: 'qs_user',
            password: 'Qian123!@#shou',
            database: 'car_net_admin',
            logging: false,
            timezone: '+08:00',
        }
    }

}
