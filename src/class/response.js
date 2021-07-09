
'use strict'

class Response {
  static async success(ctx, { msg = '请求完成', data = null, token = '' }) {
    const body = { status: 1, msg, data }
    if (token) {
      body.token = 'Bearer ' + token
    }
    ctx.body = body
    return ctx
  }

  static failure(ctx, { msg = '操作失败', code = '' }) {
    ctx.body = { status: 0, code, msg }
    return ctx
  }

  static error(ctx, err) {
    console.log(err)
    ctx.body = {
      code: 'SERVER_ERROR_EXCEPTION',
      msg: '服务器异常，请等待修复'
    }
    return ctx
  }
}

module.exports = Response
