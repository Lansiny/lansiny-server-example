
const Service = require('../class/service')
const { AdminLogModel } = require('../db/model')

class AdminLogService extends Service {
  static async create({ user_id = 0, url = '', params = {} }) {
    params = JSON.stringify(params)
    return await AdminLogModel.create({ userId: user_id, url, params })
  }

  static async getList({ start_id = 0, page_size = 10 }) {
    const result = await AdminLogModel.getList({ startId: start_id, pageSize: page_size })
    this.normalizeDate(result, 'create_at')
    return result
  }
}

module.exports = AdminLogService
