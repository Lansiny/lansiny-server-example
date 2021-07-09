
'use strict'

const { get, set, del } = require('../db/redis')
const app = require('../../config/constant').app
class Cache {
  constructor(cacheName = '') {
    this.name = cacheName
    this.keyPrefix = `${app}:${this.name}`
  }

  async getCache({ name = '' }) {
    return get(`${this.keyPrefix}:${name}`)
  }

  async setCache({ name = '', values = {}, timeout = 60 * 15 }) {
    return set(`${this.keyPrefix}:${name}`, values, timeout)
  }

  async delCache({ name = '' }) {
    return del(`${this.keyPrefix}:${name}`)
  }
}

module.exports = Cache
