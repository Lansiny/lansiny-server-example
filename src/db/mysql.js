'use strict'

const mysql = require('mysql2')
const config = require('config')

const mysqlType = require('../../config/constant').database.mysqlType
const pool = mysql.createPool({ ...config.mysql[mysqlType] })

const query = function (
  sql,
  values,
  callback = (_sql = '', _values = []) => { }
) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject(err)
      else {
        connection.query(sql, values, function (err, rows) {
          if (err) {
            console.log(this.sql)
            reject(err)
          } else {
            callback(this.sql, values)
            resolve(rows)
          }
          pool.releaseConnection(connection)
        })
      }
    })
  })
}

// const heartbeat = async () => {
//   try {
//     await query('select 1')
//   } catch (err) {
//     console.log(err)
//   }
//   setTimeout(heartbeat, 60 * 1000 * 10)
// }

// heartbeat()

module.exports = {
  pool,
  query
}
