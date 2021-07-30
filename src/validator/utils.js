
const Joi = require('koa-joi-router').Joi

const schema = {
  id: Joi.number().integer().min(0),
  pageSize: Joi.number().integer().min(1),
  isValid: Joi.number().integer().min(0).max(1),
  order: Joi.string().valid('desc', 'asc'),
  fileName: Joi.string().min(1).max(64),
  fileType: Joi.string().min(1).max(16)
}

module.exports = schema
