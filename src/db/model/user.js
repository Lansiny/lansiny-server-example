
'use strict'

const { Model } = require('../../class')
const { query } = require('../mysql')

class UserModel extends Model {
  constructor() {
    super('user')
  }

  // 添加账号
  create({ username = '', email = '', password = '', type = 3 }) {
    const post = [username, email, password, type]
    const sql = `
      insert ignore into \`${this.tableName}\`
        (username, email, \`password\`, \`type\`)
      values
        (?, ?, ?, ?)
    `
    return query(sql, post)
  }

  // 修改密码
  updatePasswordByUsername({ username = '', password = '' }) {
    const post = [password, username]
    const sql = `
      update \`${this.tableName}\`
      set
        \`password\` = ?
      where
        username = ?
    `
    return query(sql, post)
  }

  updatePasswordByEmail({ email = '', password = '' }) {
    const post = [password, email]
    const sql = `
      update \`${this.tableName}\`
      set
        \`password\` = ?
      where
        email = ?
    `
    return query(sql, post)
  }

  // 账号注销
  del({ username = '' }) {
    const sql = `
      update \`${this.tableName}\`
      set
        is_valid = 0
      where
        username = ?
    `
    return query(sql, username)
  }

  // 获取用户可用性信息
  getIsValidByUsername({ username = '' }) {
    const sql = `
      select
        is_valid
      from \`${this.tableName}\`
      where
        username = ?
    `
    return query(sql, username)
  }

  getIsValidById({ userId = '' }) {
    const sql = `
      select
        is_valid,
        email,
        username
      from \`${this.tableName}\`
      where
        id = ?
    `
    return query(sql, userId)
  }

  getIsValidByEmail({ email = '' }) {
    const sql = `
      select
        is_valid
      from \`${this.tableName}\`
      where
        email = ?
    `
    return query(sql, email)
  }

  // 获取密码
  getPasswordByUsername({ username = '' }) {
    const sql = `
      select
        id,
        email,
        username,
        password
      from \`${this.tableName}\`
      where
        username = ?
        and is_valid = 1
    `
    return query(sql, username)
  }

  // 获取用户信息
  getType({ userId = 0 }) {
    const sql = `
      select
        \`type\`
      from \`${this.tableName}\`
      where
        id = ?
        and is_valid = 1
    `
    return query(sql, userId)
  }
}

module.exports = new UserModel()
