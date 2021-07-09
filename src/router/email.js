
'use strict'

const router = require('koa-joi-router')
const { EmailSchema } = require('../validator')
const { EmailController } = require('../controller')

const api = router()
api.prefix('/api/email')

api.route({
  method: 'post',
  path: '/verifyEmail',
  validate: {
    body: {
      email: EmailSchema.email.required()
    },
    type: 'json'
  },
  handler: EmailController.verifyEmail
})

module.exports = api
