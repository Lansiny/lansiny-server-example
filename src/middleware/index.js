
'use strict'

const path = require('path')
const logger = require('koa-logger')
const helmet = require('koa-helmet')

const cors = require('./cors')
const bodyParser = require('./body_parser')
const paramsParser = require('./params_parser')
const debug = require('./debug')

const routes = require('../common/routes')

const middleware = (app) => {
  if (process.env.NODE_ENV === 'dev') app.use(logger())
  app.use(helmet())
  app.use(cors())
  app.use(bodyParser(app))
  app.use(paramsParser())
  if (process.env.NODE_ENV === 'dev') app.use(debug())
  routes.init(app, path.join(__dirname, '..', '/router/'))
}

module.exports = middleware
