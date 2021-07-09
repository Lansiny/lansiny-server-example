
'use strict'

const MD5 = require('md5')
const jwt = require('jsonwebtoken')
const config = require('config')

const { AuthCache } = require('../cache')

const jwtSecret = config.key.jwtSecret
const tokenSecret = config.key.tokenSecret

async function verifyToken(ctx) {
  let auth = null
  let isExpire = false
  let tokenStr = ''
  let authSecretKey = ''
  try {
    const authorization = ctx.request.header.authorization
    if (authorization && authorization !== 'null') {
      const tokenStrArr = authorization.split(' ')
      if (tokenStrArr.length > 1 && tokenStrArr[0] === 'Bearer') {
        tokenStr = tokenStrArr[1]
      }
      auth = jwt.verify(tokenStr, jwtSecret)
      authSecretKey = MD5(JSON.stringify({ user: auth.user, tokenSecret }))
      const token = await AuthCache.loadToken({ authSecretKey })
      if (!token) {
        isExpire = true
      }
    }
  } catch (error) {
    auth = null
    isExpire = true
    console.log(error)
  }
  return {
    isExpire,
    auth,
    authSecretKey
  }
}

async function signToken({ auth = { user: {} }, timeout = '7d' }) {
  const authSecretKey = MD5(JSON.stringify({ user: auth.user, tokenSecret }))
  const token = jwt.sign(auth, jwtSecret, { expiresIn: timeout })
  await AuthCache.saveToken({ authSecretKey, token })
  return token
}

module.exports = {
  verifyToken,
  signToken
}
