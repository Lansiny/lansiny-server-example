
'use strict'

module.exports = {
  // 应用名称 显示为进程名
  app: 'lansiny-server-example',
  // 应用名称 这个貌似没啥用
  name: '后端模板演示项目',
  // 用来发送验证码的邮箱，需要开启smtp服务
  smtpEmail: '"Lautsky" <lautsky@qq.com>',
  // koa-body模块的配置
  bodyParser: {
    maxFieldsSize: 100 * 1024 * 1024,
    jsonLimit: '2mb',
    formLimit: '2mb'
  },
  // 需要启用的数据库配置
  database: {
    mysqlType: 'test',
    redisType: 'test'
  }
}
