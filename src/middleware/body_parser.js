
'use strict'

const koaBody = require('koa-body')
const path = require('path')
const fileMaxSize = require('../../config/constant').fileMaxSize
const fse = require('fs-extra')

const uploadDir = path.join(__dirname, '..', '..', '/public/uploads/temp')

module.exports = function (app) {
  return koaBody({
    jsonLimit: '2mb',
    formLimit: '2mb',
    multipart: true, // 支持文件上传
    encoding: 'utf8',
    formidable: {
      uploadDir: uploadDir,
      keepExtensions: true, // 保持文件的后缀
      maxFieldsSize: fileMaxSize,
      onFileBegin: async (name, file) => {
        await fse.ensureDir(uploadDir)
      },
      onError: err => {
        console.log(err)
      }
    }
  })
}
