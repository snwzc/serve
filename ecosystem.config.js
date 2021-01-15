module.exports = {
    apps: [
        {
            name: "car_net_admin_pro",
            // 项目启动入口文件
            script: "./main.js",
            // 项目环境变量
            env: {
                "PORT": 3001,
                "NODE_ENV": "pro"
            }
        },
         {
            name: 'car_net_admin_dev',
            script: "./main.js",
            env: {
                "PORT": 3000,
                "NODE_ENV": "dev"
            }
        }
    ]
}