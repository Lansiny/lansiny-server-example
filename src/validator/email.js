
const Joi = require('koa-joi-router').Joi

const schema = {
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  verificationCode: Joi.string().min(6).max(32).regex(/^[A-Za-z0-9]+$/)
}

module.exports = schema
