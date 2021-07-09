
'use strict'

module.exports = {
  USER_AUTH_EXPIRE: {
    msg: '验证令牌已失效，请重新登录',
    code: 'USER_AUTH_EXPIRE'
  },
  USER_NOT_EXIST: {
    msg: '无法验证用户信息，请重新登录',
    code: 'USER_NOT_EXIST'
  },
  USER_LOGIN_INCORRECT: {
    msg: '登录失败，用户名或密码不正确',
    code: 'USER_LOGIN_INCORRECT'
  },
  USER_NOT_LOGIN: {
    msg: '您目前处于离线状态，请登录',
    code: 'USER_NOT_LOGIN'
  },
  USER_ALREADY_LOGIN: {
    msg: '您已登录',
    code: 'USER_ALREADY_LOGIN'
  },
  USER_PERMISSION_DENIED: {
    msg: '权限不足，拒绝访问',
    code: 'USER_PERMISSION_DENIED'
  },
  USER_USERNAME_ALREADY_REGISTER: {
    msg: '该用户名已注册',
    code: 'USERNAME_ALREADY_REGISTER'
  },
  USER_USERNAME_NOT_REGISTER: {
    msg: '该用户名未注册',
    code: 'USER_USERNAME_NOT_REGISTER'
  },
  USER_EMAIL_ALREADY_REGISTER: {
    msg: '该邮箱已被注册',
    code: 'EMAIL_ALREADY_REGISTER'
  },
  USER_EMAIL_NOT_REGISTER: {
    msg: '该邮箱未注册',
    code: 'EMAIL_NOT_REGISTER'
  }
}
