
'use strict'

module.exports = {
  nodemailer: {
    host: 'smtp.qq.com',
    port: '465',
    auth: {
      user: 'lautsky@qq.com',
      pass: 'xxxxxxxxxxxxxxx'
    }
  },
  key: {
    // 签发token时候用到的密钥
    jwtSecret: 'e79L3O5isPWDLNdJ*v5g3lq5!d3j#PDf#%eUMw2k6vXvpg51C8*aTNK84$06ESh%',
    // 为鉴权中间件中需要从redis中读取的key的哈希加盐。
    tokenSecret: '^8l@F^f%VamWQgEk#NCH7xAhC0VSblO$VC$cv5sJMf0Lr%H4uKv#JogxTArAXVLi'
  }
}
