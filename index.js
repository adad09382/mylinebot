import 'dotenv/config'
import linebot from 'linebot'
import {scheduleJob} from 'node-schedule'

import course from './commands/course.js'
import fe from './commands/fe.js'
import anime from './commands/anime.js'
import * as usdtwd from './data/usdtwd.js'

scheduleJob('0 * * * *', usdtwd.updateRate)
usdtwd.updateRate()

const bot = linebot({
  channelId: process.env.CHANNEL_ID,
  channelSecret: process.env.CHANNEL_SECRET,
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
})
//當bot 收到信息事件後執行
bot.on('message', (event) => {
  if (event.message.type === 'text' && event.message.text === '共通課程') {
    course(event)
  } else if (event.message.type === 'text' && event.message.text === '前端') {
    fe(event)
  } else if (event.message.type === 'text' && event.message.text.startsWith('查動畫')) {
    anime(event)
  } else if (event.message.type === 'text' && event.message.text.startsWith('匯率')) {
    event.reply(usdtwd.exrate.toString())
  }
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('終端機已開啟')
})
