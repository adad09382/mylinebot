import axios from 'axios'
import * as cheerio from 'cheerio'
import template from '../temples/fe.js'
import fs from 'fs'
import writeJSON from '../utils/writeJSON.js'

export default async (event) => {
  try {
    const {data} = await axios.get('https://wdaweb.github.io')
    const $ = cheerio.load(data)
    const arr = []
    $('#fe .card').each(function () {
      //複製模板
      const bubble = JSON.parse(JSON.stringify(template))
      //URL 物件，第一個參數是相對位置，第二個是網址，會根據你給的網址串上第一個參數的相對位置
      bubble.hero.url = new URL(
        $(this).find('.card-header-image img').attr('src'),
        'https://wdaweb.github.io/',
      ).href

      bubble.body.contents[0].text = $(this).find('.card-title').text().trim()
      bubble.body.contents[1].contents[0].contents[0].text = $(this)
        .find('.card-description')
        .text()
        .trim()
      arr.push(bubble)
      console.log(JSON.stringify(bubble, null, 2))
    })
    const result = await event.reply({
      type: 'flex',
      altText: '前端課程',
      contents: {
        type: 'carousel',
        contents: arr,
      },
    })
    //判斷當前有沒有 dump 資料夾，沒有的話就創建一個
    // 套用寫好的 writeJSON function
    writeJSON(arr, 'fe-test')

    //印出要傳出去的值
    console.log(JSON.stringify(arr, null, 2))
    // 如果丟出去的值有錯誤，則接住丟回來
    if (result.message) {
      throw new Error(result.message)
    }
    console.log(result)
  } catch (error) {
    console.log(error)
    console.log('發生錯誤')
  }
}
