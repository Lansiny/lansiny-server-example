
const { Controller, Response } = require('../class')
const { UserException } = require('../exception')
const { UserService } = require('../service')
const { signToken } = require('../common/token')
const { AuthCache } = require('../cache')
class User extends Controller {
  // 注册
  async registry(ctx, next) {
    try {
      const params = ctx.params
      const res = await UserService.registry(params)
      const token = await signToken({ auth: { user: ctx.auth.user }, timeout: '7d' })
      return Response.success(ctx, {
        msg: '注册成功',
        data: res,
        token
      })
    } catch (err) {
      return Response.error(ctx, err)
    }
  }

  // 找回密码
  async resetPassword(ctx, next) {
    try {
      const params = ctx.params
      const res = await UserService.updatePasswordByEmail(params)
      const token = await signToken({ auth: { user: ctx.auth.user }, timeout: '7d' })
      return Response.success(ctx, {
        msg: '密码已重置',
        data: res,
        token
      })
    } catch (err) {
      return Response.error(ctx, err)
    }
  }

  // 注销账号
  async destroy(ctx, next) {
    try {
      const params = ctx.params
      const res = await UserService.del(params)
      const token = await signToken({ auth: { user: ctx.auth.user }, timeout: '7d' })
      return await Response.success(ctx, {
        msg: '账号已注销, 已退出登录',
        data: res,
        token
      })
    } catch (err) {
      return Response.error(ctx, err)
    }
  }

  // 修改密码
  async modifyPassword(ctx, next) {
    try {
      const params = ctx.params
      const res = await UserService.updatePasswordByUsername(params)
      return await Response.success(ctx, {
        msg: '密码修改成功，请重新登陆',
        data: res
      })
    } catch (err) {
      return Response.error(ctx, err)
    }
  }

  // 登录
  async login(ctx, next) {
    try {
      const params = ctx.params
      const { user, isCanAccess } = await UserService.login(params)
      if (isCanAccess) {
        const token = await signToken({ auth: { user }, timeout: '7d' })
        return await Response.success(ctx, {
          msg: '登录成功',
          data: process.NODE_ENV !== 'production' ? user : null,
          token
        })
      } else {
        return Response.failure(ctx, UserException.USER_LOGIN_INCORRECT)
      }
    } catch (err) {
      return Response.error(ctx, err)
    }
  }

  // 退出登录
  async logout(ctx, next) {
    try {
      if (ctx.auth && ctx.auth.user) {
        const authSecretKey = ctx.auth.authSecretKey
        if (authSecretKey) {
          const delResult = await AuthCache.delToken({ authSecretKey })
          if (delResult) {
            return await Response.success(ctx, {
              msg: '已退出登录',
              data: null
            })
          }
        }
      }
      return Response.failure(ctx, UserException.USER_NOT_LOGIN)
    } catch (err) {
      return Response.error(ctx, err)
    }
  }

  // 获取用户信息
  async getUserInfo(ctx, next) {
    try {
      const isNext = ctx.auth && ctx.auth.user
      if (isNext) {
        const user = ctx.auth.user
        const { isExist, userInfo } = await UserService.getUserInfo(user)
        if (isExist) {
          return Response.success(ctx, {
            msg: '你目前处于在线状态',
            data: userInfo
          })
        }
      } else return Response.failure(ctx, UserException.USER_NOT_EXIST)
    } catch (err) {
      return Response.error(ctx, err)
    }
  }

  // ----------------------------------------------------------------
  // | check handler
  // ----------------------------------------------------------------

  // 需要用户是管理员
  async checkIsAdmin(ctx, next) {
    try {
      const userId = ctx.auth.user ? ctx.auth.user.user_id : 0
      if (userId) {
        const { isCanAccess } = await UserService.getType({ user_id: userId })
        if (isCanAccess) return next()
      }
      return Response.failure(ctx, UserException.USER_PERMISSION_DENIED)
    } catch (err) {
      return Response.error(ctx, err)
    }
  }

  // 需要该邮箱已注册
  async checkIsExistByEmail(ctx, next) {
    try {
      const params = ctx.params
      const isExistResult = await UserService.getIsExistByEmail(params)
      const isNext = !(isExistResult && isExistResult.length > 0)
      if (isNext) return next()
      else {
        return Response.failure(ctx, UserException.USER_EMAIL_NOT_REGISTER)
      }
    } catch (err) {
      return Response.error(ctx, err)
    }
  }

  // 需要改邮箱未被注册
  async checkIsNotExistByEmail(ctx, next) {
    try {
      const params = ctx.params
      const isExistResult = await UserService.getIsExistByEmail(params)
      const isNext = isExistResult && isExistResult.length > 0
      if (isNext) return next()
      else {
        return Response.failure(ctx, UserException.USER_EMAIL_ALREADY_REGISTER)
      }
    } catch (err) {
      return Response.error(ctx, err)
    }
  }

  // 需要用户名可用
  async checkIsExistByUsername(ctx, next) {
    try {
      const params = ctx.params
      const isExistResult = await UserService.getIsExistByUsername(params)
      const isNext = !(isExistResult && isExistResult.length > 0)
      if (isNext) return next()
      else {
        return Response.failure(ctx, UserException.USER_USERNAME_ALREADY_REGISTER)
      }
    } catch (err) {
      return Response.error(ctx, err)
    }
  }

  // 需要用户已登录
  async checkIsLogin(ctx, next) {
    try {
      if (ctx.auth && ctx.auth.user) {
        if (ctx.auth.isExpire) return Response.failure(ctx, UserException.USER_AUTH_EXPIRE)
        else return next()
      } else {
        return Response.failure(ctx, UserException.USER_NOT_LOGIN)
      }
    } catch (err) {
      return Response.error(ctx, err)
    }
  }

  // 需要用户未登录
  async checkIsNotLogin(ctx, next) {
    try {
      if (!(ctx.auth && ctx.auth.user)) {
        return next()
      } else {
        return Response.failure(ctx, UserException.USER_ALREADY_LOGIN)
      }
    } catch (err) {
      return Response.error(ctx, err)
    }
  }
}

module.exports = new User()
