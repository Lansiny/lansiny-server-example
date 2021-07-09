
const Joi = require('koa-joi-router').Joi

const schema = {
  id: Joi.number().integer().min(0),
  pageSize: Joi.number().integer().min(1),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  verificationCode: Joi.string().min(6).max(32).regex(/^[A-Za-z0-9]+$/),
  isValid: Joi.number().integer().min(0).max(1),
  order: Joi.string().valid('desc', 'asc'),
  fileName: Joi.string().min(1).max(64),
  fileType: Joi.string().min(1).max(16)
}

module.exports = schema
