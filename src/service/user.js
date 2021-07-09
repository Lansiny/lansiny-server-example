
const Service = require('../class/service')
const { UserModel } = require('../db/model')
const MD5 = require('md5')
class UserService extends Service {
  static encrypt(password) {
    return MD5(password)
  }

  // 判断用户是否存在
  static async getIsExistByEmail({ email = '' }) {
    return await UserModel.getIsValidByEmail({ email })
  }

  static async getIsExistByUsername({ username = '' }) {
    return await UserModel.getIsValidByUsername({ username })
  }

  static async getUserInfo({ user_id: userId = '' }) {
    let isExist = false
    let isExistResult = [{ username: '', email: '' }]
    if (userId) {
      isExistResult = await UserModel.getIsValidById({ userId })
      isExist = isExistResult && isExistResult.length > 0
    }
    return {
      isExist,
      userInfo: {
        username: isExistResult[0].username,
        email: isExistResult[0].email
      }
    }
  }

  static async getIsExistById({ user_id = '' }) {

  }

  // 注册
  static async registry({ username = '', email = '', password = '' }) {
    password = this.encrypt(password)
    return await UserModel.create({ username, email, password, type: 3 })
  }

  // 账号注销
  static async del({ username = '' }) {
    return await UserModel.del({ username })
  }

  static async getType({ user_id = 0 }) {
    const result = await UserModel.getType({ userId: user_id })
    let isCanAccess = false
    if (result && result.length >= 0) {
      const type = result[0].type
      if (type === 1 || type === 2) isCanAccess = true
    }
    return { isCanAccess }
  }

  // 修改密码
  static async updatePasswordByUsername({ username = '', password = '' }) {
    password = this.encrypt(password)
    return await UserModel.updatePasswordByUsername({ username, password })
  }

  static async updatePasswordByEmail({ email = '', password = '' }) {
    password = this.encrypt(password)
    return await UserModel.updatePasswordByEmail({ email, password })
  }

  // 登录
  static async login({ username = '', password = '' }) {
    const result = await UserModel.getPasswordByUsername({ username })
    const user = {}
    let isCanAccess = false
    if (result && result.length > 0) {
      if (this.encrypt(password) === result[0].password) {
        isCanAccess = true
      }
      user.user_id = result[0].id
      user.email = result[0].email
      user.username = result[0].username
    }

    return { user, isCanAccess }
  }
}

module.exports = UserService
