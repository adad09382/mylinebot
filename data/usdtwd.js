import axios from 'axios'

export let exrate = 30

export const updateRate = async () => {
  try {
    const {data} = await axios.get('https://tw.rter.info/capi.php')
    exrate = data.USDTWD.Exrate
    return exrate
  } catch (error) {
    console.log('發生錯誤')
    console.log(error)
  }
}
