import fs from 'fs'

// JS DOC
/**
 * @param {string} data 資料物件或陣列
 * @param {string} file 印出的檔名
 */
export default (data, file) => {
  //判斷當前有沒有 dump 資料夾，沒有的話就創建一個
  if (process.env.DUMP !== 'true') {
    if (!fs.existsSync('./dump')) {
      fs.mkdirSync('./dump')
    }
    fs.writeFileSync(`./dump/${file}.json`, JSON.stringify(data, null, 2))
  }
}
