
'use strict'

const koaBody = require('koa-body')
const path = require('path')
const maxFieldsSize = require('../../config/constant').bodyParser.maxFieldsSize
const jsonLimit = require('../../config/constant').bodyParser.jsonLimit
const formLimit = require('../../config/constant').bodyParser.formLimit
const fse = require('fs-extra')

const uploadDir = path.join(__dirname, '..', '..', '/public/uploads/temp')

module.exports = function (app) {
  return koaBody({
    jsonLimit,
    formLimit,
    multipart: true, // 支持文件上传
    encoding: 'utf8',
    formidable: {
      uploadDir,
      maxFieldsSize,
      keepExtensions: true, // 保持文件的后缀
      onFileBegin: async (name, file) => {
        await fse.ensureDir(uploadDir)
      },
      onError: err => {
        console.log(err)
      }
    }
  })
}
