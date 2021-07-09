
'use strict'

const nodemailer = require('nodemailer')
const config = require('config')
const email = require('../../config/constant').smtpEmail

const transporter = nodemailer.createTransport({
  host: config.nodemailer.host,
  port: config.nodemailer.port,
  secure: true, // true for 465, false for other ports
  auth: {
    user: config.nodemailer.auth.user,
    pass: config.nodemailer.auth.pass
  }
})

const sendMailer = async function ({ to = '', subject = '', text = '' }) {
  const params = {
    from: email,
    to, // 可以是数组，群发
    subject,
    text
  }
  return transporter.sendMail(params)
}

module.exports = sendMailer
