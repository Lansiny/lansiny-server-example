
const path = require('path')
const fse = require('fs-extra')
const filePassList = require('../../config/file_pass_list')

const assetsHelper = {
  getIsPass({ ext = '', type = '' }) {
    let flag = false
    try {
      for (let i = 0; i < filePassList[type].length; i++) {
        if (ext === filePassList[type][i]) {
          flag = true
        }
      }
    } catch (error) {
      console.log(error)
      return false
    }

    return flag
  },
  async saveFile(file) {
    const nameStrArr = file.name.split('.')
    const ext = nameStrArr.length > 0 ? nameStrArr[nameStrArr.length - 1] : 'file'
    const tempPath = file.path
    const type = file.type.split('/')[0]
    if (this.getIsPass({ ext, type })) {
      const fileName = `${Date.now()}-${file.name}`
      const filePath = path.join(__dirname, '..', '..', `/public/uploads/assets/${fileName}`)
      const fileDirPath = path.join(__dirname, '..', '..', '/public/uploads/assets')
      await fse.ensureDir(fileDirPath)
      const reader = fse.createReadStream(tempPath)
      const stream = fse.createWriteStream(filePath)
      reader.pipe(stream)
      nameStrArr.pop()
      await fse.remove(tempPath)
      return {
        ext,
        type,
        name: file.name,
        path: '/uploads/assets/' + fileName
      }
    } else {
      await fse.remove(tempPath)
      return false
    }
  }
}

module.exports = assetsHelper
