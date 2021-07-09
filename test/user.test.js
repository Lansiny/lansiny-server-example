const { httpTest } = require('../src/common/http_test_preload')
const request = require('superagent')

const MD5 = require('md5')

const user = {
  username: 'test',
  email: 'test@example.com',
  password: MD5('admin'),
  verificationCode: '',
  token: ''
}

httpTest({ tag: 'Test', title: '开始测试' }, async (url, t) => {
  t.log('这个测试是非正式测试，仅用于检查测试功能是否可用')
  t.log('NODE_ENV: test')
  t.log('PREFIX_URL: ' + url)
  t.pass()
})

httpTest({
  tag: 'User',
  title: '1 失败登录测试',
  log: '输入错误的用户名和密码，提示登录失败',
  path: '/api/user/login'
}, async (url, t) => {
  const { body: res } = await request.post(url).send({
    username: user.username,
    password: '123456789'
  }).set('Authorization', user.token)
  t.is(res.code, 'USER_LOGIN_INCORRECT', res.message)
})

httpTest({
  tag: 'User',
  title: '2 成功登录测试',
  log: '输入正确的用户名和密码相匹配，提示登录成功',
  path: '/api/user/login'
}, async (url, t) => {
  const { body: res } = await request.post(url).send({
    username: user.username,
    password: user.password
  }).set('Authorization', user.token)
  user.token = res.token
  t.is(res.status, 1, res.message)
})

httpTest({
  tag: 'User',
  title: '3 退出登录测试',
  log: '在登录状态下退出登录，会删除验证信息',
  path: '/api/user/logout'
}, async (url, t) => {
  const { body: res } = await request.get(url).set('Authorization', user.token)
  t.is(res.status, 1, res.message)
})
