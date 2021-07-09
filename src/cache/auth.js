
'use strict'

const { Cache } = require('../class')

class Auth extends Cache {
  constructor() {
    super('Auth')
  }

  async loadToken({ authSecretKey = '' }) {
    return await this.getCache({ name: `Token:${authSecretKey}` })
  }

  async saveToken({ authSecretKey = '', token = '' }) {
    return await this.setCache({ name: `Token:${authSecretKey}`, values: token, timeout: 60 * 60 * 24 * 7 })
  }

  async delToken({ authSecretKey = '' }) {
    return await this.delCache({ name: `Token:${authSecretKey}` })
  }
}

module.exports = new Auth()
