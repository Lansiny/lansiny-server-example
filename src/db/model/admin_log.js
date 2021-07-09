
'use strict'

const { Model } = require('../../class')
const { query } = require('../mysql')

class AdminLogModel extends Model {
  constructor() {
    super('admin_log')
  }

  create({ userId = 0, url = '', params = '' }) {
    const post = [userId, url, params]
    const sql = `
      insert into \`${this.tableName}\`
        (user_id, url, params)
      values
        (?, ?, ?)
    `
    return query(sql, post)
  }

  getList({ startId = 0, pageSize = 10 }) {
    const post = [startId, pageSize]
    const sql = `
      select
        id,
        user_id,
        url,
        params,
        create_at
      from ${this.tableName}
      where
        id >= ?
        and is_valid = 1
      order by id desc
      limit ? offset 0
    `
    return query(sql, post)
  }
}

module.exports = new AdminLogModel()
