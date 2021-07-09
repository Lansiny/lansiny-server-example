
const http = require('http')
const ava = require('ava')
const app = require('../../app')

const port = 3000
const prefixUrl = 'http://localhost:' + port

ava.before(async t => {
  t.context.server = http.createServer(app.callback()).listen(port)
})

ava.after.always(t => {
  t.context.server.close()
})

function httpTest({ tag = '', title = '', log = '', path = '' }, callback = async (url = '', t) => { }) {
  ava(tag + ' - ' + title, async t => {
    let logText = ''
    if (path && log) {
      logText = `${path} - ${log}`
    } else if (!path) {
      logText = log
    } else if (!log) {
      logText = path
    }
    if (logText) t.log(logText)
    const url = prefixUrl + path
    await callback(url, t)
  })
}

module.exports = {
  ava, httpTest
}
