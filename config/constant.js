
'use strict'

module.exports = {
  app: 'lansiny-server-example',
  staticUrl: 'http://localhost',
  name: '后端模板演示项目',
  smtpEmail: '"Lautsky" <lautsky@qq.com>',
  adminInitPassword: 'admin',
  bodyParser: {
    maxFieldsSize: 100 * 1024 * 1024,
    jsonLimit: '2mb',
    formLimit: '2mb'
  },
  database: {
    mysqlType: 'test',
    redisType: 'test'
  }
}
