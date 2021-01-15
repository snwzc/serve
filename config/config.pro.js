
// 正式地址配置
module.exports = {
    database: {
        schema: 'car_net_admin',
        sequelize: {
            dialect: 'postgres',         // 数据库类型
            // host: 'pgm-8vb3xao130t7i1o60o.pgsql.zhangbei.rds.aliyuncs.com',
            // port: 1433,
            // username: 'front_manage',
            // password: 'qwe!@#front123',
            host: 'pgm-8vbyd464uxh2733c720009m.pgsql.zhangbei.rds.aliyuncs.com',
            port: 1921,
            username: 'front_manage',
            password: 'Eo%0SnOdeGj',
            database: 'car_net_admin',
            logging: false,
            timezone: '+08:00',
        }
    }
}