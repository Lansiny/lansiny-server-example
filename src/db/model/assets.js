
'use strict'

const { Model } = require('../../class')
const { query } = require('../mysql')

class AssetsModel extends Model {
  constructor() {
    super('assets')
  }

  create({ name = '', ext = '', type = '', path = '' }) {
    const post = [name, ext, type, path]
    const sql = `
      insert into \`${this.tableName}\`
        (\`name\`,ext, \`type\`, path)
      values
        (?, ?, ?, ?)
    `
    return query(sql, post)
  }

  update({ assetsId = 0, name = '' }) {
    const post = [name, assetsId]
    const sql = `
      update \`${this.tableName}\`
      set
        \`name\` = ?
      where
        id = ?
    `
    return query(sql, post)
  }

  del({ assetsId = 0 }) {
    const sql = `
      update \`${this.tableName}\`
      set
        is_valid = 0
      where
        id = ?
    `
    return query(sql, assetsId)
  }

  getList({ type = '', startId = 0, pageSize = 10000 }) {
    const condition = this.getCondition({
      field: ['assets.`type`'],
      values: [type]
    })
    const order = this.getOrderStr({
      field: ['assets.id'],
      values: ['desc']
    })
    const post = condition.values
    post.unshift(startId)
    post.push(pageSize)
    const sql = `
      select
        id,
        \`name\`,
        \`type\`,
        path,
        create_at
      from \`${this.tableName}\`
      where
        id >= ?
        and is_valid = 1
      ${condition.str}
      ${order}
      limit ? offset 0
    `
    return query(sql, post)
  }

  getIsValidById({ assetsId = 0 }) {
    const sql = `
      select
        is_valid
      from \`${this.tableName}\`
      where
        id = ?
    `
    return query(sql, assetsId)
  }
}

module.exports = new AssetsModel()
