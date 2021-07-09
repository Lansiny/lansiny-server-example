
const { Controller, Response } = require('../class')

class Test extends Controller {
  async getToken(ctx, next) {
    try {
      // const body = Controller.getParams(ctx)
      const auth = ctx.auth
      const res = {
        // ...body,
        auth,
        ...ctx.params
      }
      return Response.success(ctx, {
        msg: '响应成功',
        data: res
      })
    } catch (err) {
      return Response.error(ctx, err)
    }
  }
}

module.exports = new Test()
