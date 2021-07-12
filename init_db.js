const path = require('path')

const { query, pool } = require('./src/db/mysql')
const sqlLoader = require('./src/common/sql')

async function initDB() {
  await sqlLoader.init(query, path.join(__dirname, '/src/db/sql/table/'))
  await sqlLoader.init(query, path.join(__dirname, '/src/db/sql/initial/'))
  // process.exit(1)
}

initDB()
