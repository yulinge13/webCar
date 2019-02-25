// exports.mysql = {
//     // 单数据库信息配置
//     client: {
//         // host
//         host: '127.0.0.1',
//         // 端口号
//         port: '3306',
//         // 用户名
//         user: 'shop',
//         // 密码
//         password: '123456',
//         // 数据库名
//         database: 'car',
//     },
//     // 是否加载到 app 上，默认开启
//     app: true,
//     // 是否加载到 agent 上，默认关闭
//     agent: false,

// };

exports.sequelize = {
    // 单数据库信息配置

    dialect: 'mysql',
    // host
    host: '127.0.0.1',
    // 端口号
    port: '3306',
    // 用户名
    username: 'root',
    // 密码
    password: '123456',
    // 数据库名
    database: 'car',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    define: {
        timestamps: false, // true by default
        freezeTableName: true
    },
    timezone: '+08:00' //东八时区
};