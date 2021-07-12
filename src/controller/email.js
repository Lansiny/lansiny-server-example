
'use strict'

const { Controller, Response } = require('../class')
const { EmailException } = require('../exception')
const { EmailCache } = require('../cache')
const { signToken } = require('../common/token')
const sendmailer = require('../common/sendmailer')
const appName = require('../../config/constant').name

const MD5 = require('md5')
const moment = require('moment')

class Email extends Controller {
  // ----------------------------------------------------------------
  // | service handler
  // ----------------------------------------------------------------

  // 邮箱验证
  async verifyEmail(ctx, next) {
    try {
      const auth = ctx.state.auth
      const { email } = ctx.state.params
      const verificationCode = Math.random().toString().substring(2, 8)
      if (process.env.NODE_ENV === 'production') {
        await sendmailer({
          to: email,
          subject: appName,
          text: `[验证码] ${verificationCode} , 该验证码15分钟内有效, 请勿泄漏或转发, 如不是本人操作, 请忽略此邮件。`
        })
      }
      await EmailCache.setVerificationCode({
        email,
        verificationCode: MD5(verificationCode)
      })
      auth.isVerifyEmail = true
      auth.date = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss:SSS')
      const token = await signToken({ auth, timeout: '7d' })
      return await Response.success(ctx, {
        msg: '邮箱验证码已发送',
        data: process.NODE_ENV !== 'production' ? { verificationCode } : null,
        token
      })
    } catch (err) {
      return Response.error(ctx, err)
    }
  }

  // ----------------------------------------------------------------
  // | check handler
  // ----------------------------------------------------------------

  // 检查是否进行邮箱验证
  async checkIsVerifyEmail(ctx, next) {
    try {
      const isNext = ctx.state.auth.isVerifyEmail
      if (isNext) {
        return next()
      } else {
        return Response.failure(ctx, EmailException.EMAIL_NOT_VERIFY)
      }
    } catch (err) {
      return Response.error(ctx, err)
    }
  }

  // 检查邮箱验证码是否正确
  async checkVerificationCode(ctx, next) {
    try {
      const params = ctx.state.params
      const cache = await EmailCache.getVerificationCode(params)
      if (cache === null || !cache.verificationCode) {
        return Response.failure(ctx, EmailException.EMAIL_NOT_VERIFY)
      } else {
        if (MD5(params.verification_code) === cache.verificationCode) return next()
        else {
          return Response.failure(ctx, EmailException.EAMIL_VERIFICATION_CODE_INCORRECT)
        }
      }
    } catch (err) {
      return Response.error(ctx, err)
    }
  }
}

module.exports = new Email()
