import 'dotenv/config'
import axios from 'axios'
import * as cheerio from 'cheerio'
import template from '../temples/anime.js'
import writeJSON from '../utils/writeJSON.js'

export default async (event) => {
  try {
    const bubble = JSON.parse(JSON.stringify(template))
    const {data} = await axios.get('https://ani.gamer.com.tw/animeVideo.php?sn=22245')
    const $ = cheerio.load(data)

    console.log('標題: ' + $('.data-file img').attr('alt'))
    console.log('圖片: ' + $('.data-file img').attr('data-src'))
    console.log('評分: ' + $('.score-overall-number').text())
    bubble.body.contents[0].url = $('.data-file img').attr('alt')
    bubble.body.contents[1].contents[0].contents[0].text = $('.data-file img').attr('data-src')
    bubble.body.contents[1].contents[1].contents[0].text = $('.score-overall-number').text()
    writeJSON(bubble, 'anime-test')

    const result = await event.reply({
      type: 'flex',
      altText: $('.data-file img').attr('alt'),
      contents: {
        contents: bubble,
      },
    })

    //印出要傳出去的值
    console.log(JSON.stringify(bubble, null, 2))
    // 如果丟出去的值有錯誤，則接住丟回來
    if (result.message) {
      throw new Error(result.message)
    }
    console.log(result)
  } catch (error) {
    console.log('出現錯誤')
    console.log(error)
  }
}
