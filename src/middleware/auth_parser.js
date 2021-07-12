
'use strict'
const { verifyToken } = require('../common/token')

module.exports = function () {
  return async (ctx, next) => {
    const { isExpire, auth, authSecretKey } = await verifyToken(ctx)
    if (auth) {
      delete auth.exp
      delete auth.iat
      if (!(auth.user && auth.user.user_id)) {
        auth.user = null
      }
      ctx.state.auth = { ...auth, isExpire, authSecretKey }
    } else {
      ctx.state.auth = null
    }
    await next()
  }
}
