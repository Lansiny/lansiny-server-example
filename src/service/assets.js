
const Service = require('../class/service')
const { AssetsModel } = require('../db/model')

class AssetsService extends Service {
  static async getIsExist({ assets_id = '' }) {
    return await AssetsModel.getIsValidById({ assetsId: assets_id })
  }

  static async create({ name = '', ext = '', type = 1, path = '' }) {
    return await AssetsModel.create({ name, ext, path, type })
  }

  static async modify({ name = '', assets_id = 0 }) {
    return await AssetsModel.update({ name, assetsId: assets_id })
  }

  static async del({ assets_id = 0 }) {
    return await AssetsModel.del({ assetsId: assets_id })
  }

  static async getList({ type = '', start_id = 0, page_size = 10000 }) {
    const result = await AssetsModel.getList({ type, startId: start_id, pageSize: page_size })
    this.normalizeDate(result, 'create_at')
    return result
  }
}

module.exports = AssetsService
