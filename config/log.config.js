//日志配置文件
const log4 = require('log4js')

log4.configure({
    appenders: {
        //所有日志记录，文件类型file   
        all: {
            type: 'dateFile',
            filename: './log/all',
            pattern: 'yyyy-MM-dd.log',
            alwaysIncludePattern: true,
        },
        //错误日志 type:过滤类型logLevelFilter,将过滤error日志写进指定文件
        errorLog: { type: 'file', filename: './log/error.log' },
        error: { type: "logLevelFilter", level: "error", appender: 'errorLog' }
    },
    categories: {
        default: { appenders: ['all','error'], level: 'info' }
    }
})

const logger = log4.getLogger('default')



module.exports = {
    logger,
}