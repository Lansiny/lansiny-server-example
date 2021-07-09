
'use strict'

const cors = require('koa2-cors')

module.exports = function () {
  return cors({
    origin: function (ctx) {
      return ctx.get('Origin') || '*'
    },
    maxAge: 86400,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With', 'X-Xsrf-Token']
  })
}
