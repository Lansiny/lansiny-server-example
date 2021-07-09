
'use strict'

const Redis = require('ioredis')
const config = require('config')
const redisType = require('../../config/constant').redisType
const store = new Redis({ ...config.redis[redisType] })

function set(key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val)
  }
  store.set(key, val)
  store.expire(key, timeout)
}

function get(key) {
  return new Promise((resolve, reject) => {
    store.get(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val == null) {
        resolve(null)
        return
      }
      try {
        resolve(JSON.parse(val))
      } catch (err) {
        resolve(val)
      }
    })
  })
}

function del(key) {
  return new Promise((resolve, reject) => {
    store.del(key, (err, val) => {
      if (err) {
        reject(err)
        return
      }
      if (val == null) {
        resolve(null)
        return
      }
      resolve(val)
    })
  })
}

module.exports = {
  set,
  get,
  del
}
