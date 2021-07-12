'use strict'

const fs = require('fs')

const sqlLoader = {
  sqlList: [],
  async init(query, path) {
    try {
      this.listDir(path)
      await this.run(query)
    } catch (error) {
      console.log(error)
    }
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
    for (const sql of this.sqlList) {
      await query(sql, [])
    }
  }
}

module.exports = sqlLoader
