import 'dotenv/config'
import axios from 'axios'
import * as cheerio from 'cheerio'
import template from '../temples/anime.js'
import writeJSON from '../utils/writeJSON.js'

const main = async () => {
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
  } catch (error) {
    console.log('出現錯誤')
    console.log(error)
  }
}

main()
