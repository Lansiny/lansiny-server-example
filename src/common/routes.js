
'use strict'

const fs = require('fs')

const routes = {
  path: '',
  app: null,
  modules: [],
  init: function (app, path) {
    if (!app) {
      return false
    }
    this.app = app
    this.path = path
    this.listDir(this.path)
    this.load(this.app)
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
    this.modules.forEach((module) => {
      if (module && module.routes) {
        app.use(module.middleware())
      }
    })
  }
}

module.exports = routes
