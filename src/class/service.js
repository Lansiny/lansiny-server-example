
'use strict'

const moment = require('moment')
class Service {
  /**
   * 日期格式化, 必须是根节点下的元素
   * @params [Array] result 查询结果的对象数组
   * @params [String] dateStr 字段名
   * @format [String] format 日期格式
   */
  static normalizeDate(result = [{}], dateStr = '', format = 'YYYY-MM-DD HH:mm:ss') {
    const arr = result
    if (!arr) {
      return null
    }
    arr.map(obj => {
      for (const key in obj) {
        if (key === dateStr) {
          obj[key] = moment(obj[key]).format(format)
          return obj
        }
      }
    })
  }

  static normalize(result = [{}], field = '', callback = value => value) {
    const arr = result
    if (!arr) {
      return null
    }
    arr.map(obj => {
      for (const key in obj) {
        if (key === field) {
          obj[key] = callback(obj[key])
          return obj
        }
      }
    })
  }

  static checkResult(result = [{}]) {
    return result && result.length > 0 ? result[0] : {}
  }

  /**
   * 把两段时间戳的差转换成 HH:mm:ss 格式
   * @params [Date] timestamp 时间戳
   */
  static getHHmmss(timestamp = 0) {
    const tempTime = moment.duration(timestamp)
    return `${tempTime.hours() <= 10 ? '0' + tempTime.hours() : tempTime.hours()
    }:${tempTime.minutes() <= 10 ? '0' + tempTime.minutes() : tempTime.minutes()
    }:${tempTime.seconds() <= 10 ? '0' + tempTime.seconds() : tempTime.seconds()
    }`
  }

  /**
   * 计算百分比
   * @params [Number] num 个数
   * @params [Number] total 总数
   * @params [Number] decimalPlaces 保留小数点后几位?
   */
  static percentage(num = 0, total = 1, decimalPlaces = 2) {
    if (total === 0) {
      return 0
    } else {
      const x = Math.pow(10, decimalPlaces)
      // @ts-ignore
      return parseInt(Math.round((num / total) * x * 100)) / x
    }
  }

  /**
   * 保留固定位数点除法
   * @params [Number] n 被除数
   * @params [Number] m 除数
   * @params [Number] decimalPlaces 保留小数点后几位?
   */
  static division(n = 0, m = 1, decimalPlaces = 2) {
    if (m === 0) {
      return 0
    } else {
      const x = Math.pow(10, decimalPlaces)
      // @ts-ignore
      return parseInt(Math.round((n / m) * x)) / x
    }
  }
}

module.exports = Service
