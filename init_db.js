
const initDB = require('./src/db/mysql').initDB

async function run() {
  await initDB()
  console.log('数据库初始化完成')
  process.exit(0)
}

run()
