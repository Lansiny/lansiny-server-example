
'use strict'

const cors = require('koa2-cors')

module.exports = function () {
  return cors({
    origin: function (ctx) {
      return ctx.origin || '*'
    },
    maxAge: 86400,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS', 'HEAD', 'PATCH'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'X-Xsrf-Token']
  })
}
