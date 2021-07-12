const path = require('path')

const { query } = require('./src/db/mysql')
const sqlLoader = require('./src/common/sql')

const initDB = () => {
  Promise.allSettled([
    sqlLoader.init(query, path.join(__dirname, '/src/db/sql/table/')),
    sqlLoader.init(query, path.join(__dirname, '/src/db/sql/initial/'))
  ]).then(result => {
    // process.exit(0)
  })
}

initDB()
