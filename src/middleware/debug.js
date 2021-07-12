
'use strict'

module.exports = function () {
  return async (ctx, next) => {
    // console.log(ctx.auth)
    // console.log(ctx.params)
    await next()
  }
}
