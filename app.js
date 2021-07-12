
// 开发环境下的单进程启动文件

// 修改进程名
process.title = require('./config/constant').app

const path = require('path')
const Koa = require('koa')
const app = new Koa()

const middleware = require('./src/middleware')

app.use((ctx, next) => {
  if (ctx.path !== '/favicon.ico') {
    return next()
  }
})

middleware(app)

app.on('error', (error, ctx) => {
  console.log('server error:', error)
})

const serve = require('koa-static')
app.use(serve(path.join(__dirname, '/public/')))

module.exports = app
