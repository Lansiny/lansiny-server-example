
'use strict'

const moment = require('moment')
const { ProgressBar } = require('./cmd_progress_bar')
class Tool {
  // 时间格式化 毫秒级别
  getHHmmssSSS (timestamp = 0) {
    const tempTime = moment.duration(timestamp)
    return `${
      tempTime.hours() < 10 ? '0' + tempTime.hours() : tempTime.hours()
    }:${
      tempTime.minutes() < 10 ? '0' + tempTime.minutes() : tempTime.minutes()
    }:${
      tempTime.seconds() < 10 ? '0' + tempTime.seconds() : tempTime.seconds()
    }.${tempTime.milliseconds()}`
  }

  // 时间格式化
  getHHmmss (timestamp = 0) {
    const tempTime = moment.duration(timestamp)
    return `${
      tempTime.hours() < 10 ? '0' + tempTime.hours() : tempTime.hours()
    }:${
      tempTime.minutes() < 10 ? '0' + tempTime.minutes() : tempTime.minutes()
    }:${
      tempTime.seconds() < 10 ? '0' + tempTime.seconds() : tempTime.seconds()
    }`
  }

  // 百分比计算
  percentage (num = 0, total = 1, decimalPlaces = 2) {
    const x = Math.pow(10, decimalPlaces)
    return parseInt(Math.round((num / total) * x * 100)) / x
  }

  // 获取固定范围随机数
  getRangeRandomNumber (min = 0, max = 10) {
    const range = max - min
    const random = Math.random()
    return min + Math.round(range * random)
  }

  // 加权随机数
  getWeightRandomNumber (allocation = [{ value: 0, weight: 2 }, { value: 1, weight: 3 }]) {
    const values = []
    for (let i = 0; i < allocation.length; i++) {
      for (let j = 0; j < allocation[i].weight; j++) {
        values.push(allocation[i].value)
      }
    }
    const randomIndex = Math.floor(Math.random() * 100) % values.length
    return values[randomIndex]
  }

  // 数据生成进度条
  async createDataBar ({
    completed = 0,
    total = 100,
    dataPart = 10,
    startTime = Date.now(),
    callback = async (completed, total, dataPart, startTime) => {}
  }) {
    const progressBar = new ProgressBar('进度:', 25)
    let tmp = 0
    let startTimeForPart = Date.now()
    let remainingTime = '--:--:--'
    for (let i = 0; i < total; i++) {
      if (completed <= total) {
        await callback(completed, total, dataPart, startTime)
        completed += 1
        tmp += 1
        if (tmp >= dataPart) {
          tmp = 0
          remainingTime =
            ((total - completed) / dataPart) * (Date.now() - startTimeForPart)
          remainingTime = this.getHHmmss(remainingTime)
          startTimeForPart = Date.now()
        }
        progressBar.render(completed, total, [
          `已用时间: ${this.getHHmmss(Date.now() - startTime)} `,
          `剩余时间: ${remainingTime}`
        ])
      }
    }
  }
}

module.exports = new Tool()
