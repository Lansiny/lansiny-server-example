
const { Controller, Response } = require('../class')
const { AdminLogService } = require('../service')

class AdminLog extends Controller {
  // ----------------------------------------------------------------
  // | service handler
  // ----------------------------------------------------------------
  async log(ctx, next) {
    try {
      if (process.env.NODE_ENV === 'production') {
        const token = ctx.token
        const params = {
          params: ctx.state.params,
          url: ctx.request.url,
          user_id: token.user && token.user.user_id ? token.user.user_id : 0
        }
        await AdminLogService.create(params)
      }
      return next()
    } catch (err) {
      return Response.error(ctx, err)
    }
  }

  async getList(ctx, next) {
    try {
      const params = ctx.state.params
      const res = await AdminLogService.getList(params)
      return Response.success(ctx, {
        msg: '查询成功',
        data: res
      })
    } catch (err) {
      return Response.error(ctx, err)
    }
  }
}

module.exports = new AdminLog()
