
'use strict'

module.exports = {
  mysql: {
    test: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      password: '19971017',
      database: 'lansiny-server-example',
      connectionLimit: 1
    }
  },
  redis: {
    test: {
      host: '127.0.0.1',
      port: 6379,
      family: 4, // 4 (IPv4) or 6 (IPv6)
      password: '19971017',
      db: 1
    }
  }
}
