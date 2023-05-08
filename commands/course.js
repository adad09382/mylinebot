import axios from 'axios'
import * as cheerio from 'cheerio'

export default async (event) => {
  try {
    const {data} = await axios.get('https://wdaweb.github.io/')
    const $ = cheerio.load(data)
    let text = ''
    $('#general .card-title').each(function () {
      text += $(this).text().trim() + '\n'
    })
    event.reply(text)
  } catch (error) {
    console.log(error)
    console.log('發生錯誤')
  }
}
