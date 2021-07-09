'use strict'

const router = require('koa-joi-router')
const api = router()

const { UtilsSchema } = require('../validator')
const { UserController, AssetsController, AdminLogController } = require('../controller')

api.prefix('/api/assets')

// ----------------------------------------------------------------
// | admin api
// ----------------------------------------------------------------

api.route({
  method: 'post',
  path: '/create',
  validate: {
    type: 'multipart'
  },
  handler: [
    UserController.checkIsLogin,
    UserController.checkIsAdmin,
    AdminLogController.log,
    AssetsController.create
  ]
})

api.route({
  method: 'post',
  path: '/modify',
  validate: {
    body: {
      assets_id: UtilsSchema.id.required(),
      name: UtilsSchema.fileName.required()
    },
    type: 'json'
  },
  handler: [
    UserController.checkIsLogin,
    UserController.checkIsAdmin,
    AssetsController.checkIsExist,
    AdminLogController.log,
    AssetsController.modify
  ]
})

api.route({
  method: 'post',
  path: '/delete',
  validate: {
    body: {
      assets_id: UtilsSchema.id.required()
    },
    type: 'json'
  },
  handler: [
    UserController.checkIsLogin,
    UserController.checkIsAdmin,
    AssetsController.checkIsExist,
    AdminLogController.log,
    AssetsController.del
  ]
})

api.route({
  method: 'get',
  path: '/getList',
  validate: {
    query: {
      start_id: UtilsSchema.id,
      page_size: UtilsSchema.pageSize,
      type: UtilsSchema.fileType
    }
  },
  handler: [
    UserController.checkIsLogin,
    UserController.checkIsAdmin,
    AssetsController.getList
  ]
})

module.exports = api
