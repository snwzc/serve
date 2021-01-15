
// 本地地址配置
module.exports = {
    database: {
        schema: 'qhnet',
        sequelize: {
            dialect: 'postgres',         // 数据库类型
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: '123',
            database: 'qhnet',
            logging: false,
            timezone: '+08:00',
        }
    }

}