
'use strict'

const singleLineLog = require('single-line-log').stdout

function ProgressBar(description, barLength) {
  // 两个基本参数(属性)
  this.description = description || 'Progress' // 命令行开头的文字信息
  this.barLength = barLength || 25 // 进度条的长度(单位：字符)，默认设为 25

  // 刷新进度条图案、文字的方法
  this.render = function (completed = 0, total = 100, tipsTextList = []) {
    const percent = (completed / total).toFixed(4) // 计算进度(子任务的 完成数 除以 总数)
    const cellNum = Math.floor(percent * this.barLength) // 计算需要多少个 █ 符号来拼凑图案

    // 拼接黑色条
    let cell = ''
    for (let i = 0; i < cellNum; i++) {
      cell += '█'
    }

    // 拼接灰色条
    let empty = ''
    for (let i = 0; i < this.barLength - cellNum; i++) {
      empty += '░'
    }
    let tipsText = ''
    for (let i = 0; i < tipsTextList.length; i++) {
      tipsText += '\n' + tipsTextList[i]
    }
    // 拼接最终文本
    const text = this.description + ': ' + (100 * percent).toFixed(2) + '% ' + cell + empty + ' ' + completed + '/' + total
    singleLineLog(text + tipsText)
  }
}

module.exports = {
  ProgressBar
}
