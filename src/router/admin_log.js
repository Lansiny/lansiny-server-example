'use strict'

const router = require('koa-joi-router')
const api = router()

const { UtilsSchema } = require('../validator')
const { AdminLogController, UserController } = require('../controller')

api.prefix('/api/adminLog')

// ----------------------------------------------------------------
// | admin api
// ----------------------------------------------------------------

api.route({
  method: 'get',
  path: '/getList',
  validate: {
    query: {
      start_id: UtilsSchema.id,
      page_size: UtilsSchema.pageSize
    }
  },
  handler: [
    UserController.checkIsLogin,
    UserController.checkIsAdmin,
    AdminLogController.getList
  ]
})

module.exports = api
