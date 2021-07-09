
'use strict'

class Model {
  constructor(tableName = '') {
    this.tableName = tableName

    this.getOrderStr = function ({ field = [''], values = [''] }) {
      if (field.length !== values.length) {
        const orderStrArr = []
        for (let i = 0; i < field.length; i++) {
          let orderStr
          orderStr = `${field[i]} desc`
          if (i !== field.length - 1) orderStr += ','
          orderStrArr.push(orderStr)
        }
        let orderStr = 'order by '
        for (let i = 0; i < orderStrArr.length; i++) {
          orderStr += orderStrArr[i]
        }
        return orderStr
      } else {
        const orderStrArr = []
        for (let i = 0; i < field.length; i++) {
          let orderStr
          orderStr = `${field[i]} ${values[i] === 'desc' || values[i] === 'asc' ? values[i] : 'desc'}`
          if (i !== field.length - 1) orderStr += ','
          orderStrArr.push(orderStr)
        }
        let orderStr = 'order by '
        for (let i = 0; i < orderStrArr.length; i++) {
          orderStr += orderStrArr[i]
        }
        return orderStr
      }
    }

    this.getCondition = function ({ field = [''], values = [] }) {
      try {
        if (field.length !== values.length) {
          throw new Error('查询条件字段拼接函数：参数数量与字段数量不符，无法进行条件查询。')
        } else {
          const valuesArr = []
          const conditionStrArr = []
          for (let i = 0; i < field.length; i++) {
            let conditionStr = ''
            if (values[i]) {
              conditionStr = ` and ${field[i]} = ?`
              conditionStrArr.push(conditionStr)
              valuesArr.push(values[i])
            }
          }
          let conditionStr = ''
          for (let i = 0; i < conditionStrArr.length; i++) {
            conditionStr += conditionStrArr[i]
          }
          return {
            str: conditionStr,
            values: valuesArr
          }
        }
      } catch (err) {
        console.log(err)
        return {
          str: '',
          values: []
        }
      }
    }
  }
}

module.exports = Model
