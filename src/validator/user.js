
const Joi = require('koa-joi-router').Joi

const schema = {
  username: Joi.string().min(4).max(16).regex(/^[a-zA-Z]+[a-zA-Z0-9]*$/),
  password: Joi.string().min(4).max(32)
}

module.exports = schema
