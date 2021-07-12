'use strict'

const fs = require('fs')

const sqlLoader = {
  path: '',
  sqlList: [],
  async init(query, path) {
    return new Promise((resolve, reject) => {
      try {
        this.path = path
        this.listDir(this.path)
        this.run(query)
        resolve()
      } catch (err) {
        reject(err)
      }
    })
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
