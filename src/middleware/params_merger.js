
'use strict'

module.exports = function () {
  return async (ctx, next) => {
    ctx.state.params = {
      ...ctx.request.query,
      ...ctx.request.params,
      ...ctx.request.body
    }
    await next()
  }
}
