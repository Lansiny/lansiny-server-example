
'use strict'

const fs = require('fs')

const routes = {
  modules: [],
  init: async function (app, path) {
    try {
      if (!app) {
        return false
      }
      this.listDir(path)
      this.load(app)
    } catch (err) {
      console.log(err)
    }
  },
  listDir: function (dir) {
    const routerFileList = fs.readdirSync(dir, 'utf-8')
    for (let i = 0; i < routerFileList.length; i++) {
      const routerFile = dir + routerFileList[i]
      const stat = fs.lstatSync(routerFile)
      if (stat.isDirectory()) {
        this.listDir(routerFile + '/')
      } else {
        const routerFilePath = routerFile.substring(0, routerFile.lastIndexOf('.'))
        this.modules.push(require(routerFilePath))
      }
    }
  },
  load: function (app) {
    for (const module of this.modules) {
      if (module && module.routes) {
        app.use(module.middleware())
      }
    }
  }
}

module.exports = routes
