

//fetch lastest block number
const fetchData = () => {
  const apiKey = "5XKQA6GX56G7IZUUTEZ88X916BQNI8J2EX"
  const lastBlockUrl=`https://api.etherscan.io/api?module=proxy&action=eth_blockNumber&${apiKey}`
  return fetch(lastBlockUrl)
}

fetchData().then(Response => {
  if (Response.ok) {
    // convert response to json
    return Response.json()
  }
  throw new Error('Api did not respond')
}).then(Response => {
  // add to html
  let dashboard = document.getElementsByClassName("dashboard")
  let lastBlock = document.createElement("h2")
  lastBlock.id = "lastblock"
  lastBlock.textContent = Number(Response.result)
  dashboard[0].appendChild(lastBlock) 
})
