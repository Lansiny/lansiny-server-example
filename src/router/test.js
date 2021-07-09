'use strict'

const router = require('koa-joi-router')
const api = router()

const { TestController } = require('../controller')

api.prefix('/api/test')

api.route({
  method: 'get',
  path: '/getToken',
  handler: [
    TestController.getToken
  ]
})

module.exports = api
