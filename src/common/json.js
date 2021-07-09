'use strict'

const fse = require('fs-extra')

async function readJson({ path = '' }) {
  try {
    return await fse.readJson(path)
  } catch (err) {
    console.log(err)
  }
}

async function writeJson({ path = '', body = '' }) {
  try {
    await fse.writeJson(path, body, 'utf8')
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  readJson,
  writeJson
}
