
'use strict'

const router = require('koa-joi-router')
const api = router()

const { UserSchema, EmailSchema } = require('../validator')
const { UserController, EmailController } = require('../controller')

api.prefix('/api/user')

// 注册
api.route({
  method: 'post',
  path: '/registry',
  validate: {
    body: {
      username: UserSchema.username.required(),
      email: EmailSchema.email.required(),
      password: UserSchema.password.required(),
      verification_code: EmailSchema.verificationCode.required()
    },
    type: 'json'
  },
  handler: [
    UserController.checkIsNotLogin,
    UserController.checkIsExistByEmail,
    EmailController.checkIsVerifyEmail,
    EmailController.checkVerificationCode,
    UserController.checkIsExistByUsername,
    UserController.registry
  ]
})

// 登录
api.route({
  method: 'post',
  path: '/login',
  validate: {
    body: {
      username: UserSchema.username.required(),
      password: UserSchema.password.required()
    },
    type: 'json'
  },
  handler: [
    UserController.checkIsNotLogin,
    UserController.login
  ]
})

// 找回密码
api.route({
  method: 'post',
  path: '/resetPassword',
  validate: {
    body: {
      email: EmailSchema.email.required(),
      password: UserSchema.password.required(),
      verification_code: EmailSchema.verificationCode.required()
    },
    type: 'json'
  },
  handler: [
    UserController.checkIsNotLogin,
    EmailController.checkIsVerifyEmail,
    EmailController.checkVerificationCode,
    UserController.checkIsNotExistByEmail,
    UserController.resetPassword
  ]
})

// 修改密码
api.route({
  method: 'post',
  path: '/modifyPassword',
  validate: {
    body: {
      username: UserSchema.username.required(),
      password: UserSchema.password.required()
    },
    type: 'json'
  },
  handler: [
    UserController.checkIsLogin,
    UserController.modifyPassword
  ]
})

// 退出登录
api.route({
  method: 'get',
  path: '/logout',
  handler: [
    UserController.logout
  ]
})

// 注销账号
api.route({
  method: 'post',
  path: '/destroy',
  validate: {
    body: {
      email: EmailSchema.email.required(),
      verification_code: EmailSchema.verificationCode.required()
    },
    type: 'json'
  },
  handler: [
    UserController.checkIsLogin,
    EmailController.checkIsVerifyEmail,
    EmailController.checkVerificationCode,
    UserController.destroy
  ]
})

// 获取用户信息
api.route({
  method: 'get',
  path: '/getUserInfo',
  handler: [
    UserController.getUserInfo
  ]
})

module.exports = api
