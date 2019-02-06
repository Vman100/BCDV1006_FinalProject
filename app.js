//fetch Data
const fetchData = (action) => {
  const apiKey = "5XKQA6GX56G7IZUUTEZ88X916BQNI8J2EX"
  const url=`https://api.etherscan.io/api?${action}&${apiKey}`
  return fetch(url)
}

// convert response to json and return result property value
const  json = async (Response) => {
  if (Response.ok) {
    let jsonResult = await Response.json()
    return jsonResult.result
  }
  throw new Error('Api did not respond')
}

// get block information by number
const getBlockByNumber = (number) => {
  return `module=proxy&action=eth_getBlockByNumber&tag=${number}&boolean=true`
}

const  request = async () => {
// set veriables for calculations
const lastBlockInfo = await fetchData(getBlockByNumber("latest"))
const Response1 = await json(lastBlockInfo)
const nBlock = "0x"+ parseInt(Response1.number - 5000).toString(16)
const nBlockInfo = await fetchData(getBlockByNumber(nBlock))
const Response2 = await json(nBlockInfo)
const avgBlockTime = (Response1.timestamp - Response2.timestamp) / 5000
const avgDifficulty = (Number(Response1.difficulty) + Number(Response2.difficulty)) / 2
const avghashRate = Response1.difficulty / avgBlockTime


// add to html
let lastBlock = document.getElementById("lastblockno")
let Transactions = document.getElementById("transactionsno")
let hashRate = document.getElementById("avghashrate")
let difficulty = document.getElementById("avgdifficulty")
lastBlock.textContent = Number(Response1.number)
Transactions.textContent = Number(Response1.transactions.length)
hashRate.textContent = `${(avghashRate / 1e9).toFixed(2)} GH/s` 
difficulty.textContent = `${(avgDifficulty / 1e12).toFixed(2)} TH`
}

request()