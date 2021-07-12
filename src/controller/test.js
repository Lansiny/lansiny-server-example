
const { Controller, Response } = require('../class')

class Test extends Controller {
  async getToken(ctx, next) {
    try {
      // const body = Controller.getParams(ctx)
      const auth = ctx.state.auth
      console.log(ctx.state)
      const res = {
        // ...body,
        // keys: ctx.keys,
        auth,
        ...ctx.state.params
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
