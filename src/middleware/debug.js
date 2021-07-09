
'use strict'

module.exports = function () {
  return async (ctx, next) => {
    // console.log('-----debug middleware-----')

    await next()
  }
}
