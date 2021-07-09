
'use strict'

const { Cache } = require('../class')

class Email extends Cache {
  constructor() {
    super('Email')
  }

  async getVerificationCode({ email }) {
    return await this.getCache({ name: `VerificationCode:${email}` })
  }

  async setVerificationCode({ email = '', verificationCode = '' }) {
    return await this.setCache({ name: `VerificationCode:${email}`, values: { verificationCode }, timeout: 60 * 15 })
  }
}

module.exports = new Email()
