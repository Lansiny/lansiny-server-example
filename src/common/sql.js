'use strict'

const fs = require('fs')

const sqlLoader = {
  path: '',
  sqlList: [],
  async init(query, path) {
    this.path = path
    this.listDir(this.path)
    await this.run(query)
  },
  listDir(dir) {
    const sqlFileList = fs.readdirSync(dir, 'utf-8')
    for (let i = 0; i < sqlFileList.length; i++) {
      const sqlFile = dir + sqlFileList[i]
      const stat = fs.lstatSync(sqlFile)
      if (stat.isDirectory()) {
        this.listDir(sqlFile + '/')
      } else {
        const sql = fs.readFileSync(sqlFile).toString()
        this.sqlList.push(sql)
      }
    }
  },
  async run(query) {
    this.sqlList.forEach(async sql => {
      if (sql) {
        await query(sql, [])
      }
    })
  }
}

module.exports = sqlLoader
