'use strict'

module.exports = {
  mysql: {
    test: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: '19971017',
      database: 'lansiny-server-example', // 数据库名称
      connectionLimit: 1 // 连接池最大连接数
    }
  },
  redis: {
    test: {
      host: '127.0.0.1',
      port: 6379,
      family: 4, // 4 (IPv4) or 6 (IPv6)
      password: '19971017',
      db: 1 // 启用的数据库index，从0开始
    }
  }
}
