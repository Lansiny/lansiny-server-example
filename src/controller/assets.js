
const { Controller, Response } = require('../class')
const { AssetsException } = require('../exception')
const { AssetsService } = require('../service')
const assetsHelper = require('../utils/assets')

class Assets extends Controller {
  // ----------------------------------------------------------------
  // | service handler
  // ----------------------------------------------------------------

  async create(ctx, next) {
    try {
      const files = ctx.request.files.file
      if (files.length) {
        for (const file of files) {
          const params = await assetsHelper.saveFile(file)
          if (params) {
            await AssetsService.create(params)
          }
        }
        return Response.success(ctx, {
          msg: '文件上传成功，已删除后缀名不符合要求的文件',
          data: null
        })
      } else {
        const params = await assetsHelper.saveFile(files)
        if (params) {
          await AssetsService.create(params)
          return Response.success(ctx, {
            msg: '文件上传成功',
            data: null
          })
        } else {
          return Response.failure(ctx, AssetsException.ASSETS_TYPE_NOT_STANDARD)
        }
      }
    } catch (err) {
      return Response.error(ctx, err)
    }
  }

  async modify(ctx, next) {
    try {
      const params = ctx.state.params
      const res = await AssetsService.modify(params)
      return Response.success(ctx, {
        msg: '修改成功',
        data: res
      })
    } catch (err) {
      return Response.error(ctx, err)
    }
  }

  async del(ctx, next) {
    try {
      const params = ctx.state.params
      const res = await AssetsService.del(params)
      return Response.success(ctx, {
        msg: '删除成功',
        data: res
      })
    } catch (err) {
      return Response.error(ctx, err)
    }
  }

  async getList(ctx, next) {
    try {
      const params = ctx.state.params
      const res = await AssetsService.getList(params)
      return Response.success(ctx, {
        msg: '查询成功',
        data: res
      })
    } catch (err) {
      return Response.error(ctx, err)
    }
  }

  // ----------------------------------------------------------------
  // | check handler
  // ----------------------------------------------------------------

  async checkIsExist(ctx, next) {
    try {
      const params = ctx.state.params
      const isExistResult = await AssetsService.getIsExist(params)
      const isNext = isExistResult && isExistResult.length > 0
      if (isNext) {
        return next()
      } else {
        return Response.failure(ctx, AssetsException.ASSETS_NOT_EXIST)
      }
    } catch (err) {
      return Response.error(ctx, err)
    }
  }
}

module.exports = new Assets()
