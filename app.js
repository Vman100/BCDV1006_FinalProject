const getLastBlockNo = "module=proxy&action=eth_blockNumber"

//fetch lastest block number
const fetchData = (action) => {
  const apiKey = "5XKQA6GX56G7IZUUTEZ88X916BQNI8J2EX"
  const url=`https://api.etherscan.io/api?${action}&${apiKey}`
  return fetch(url)
}

fetchData(getLastBlockNo).then(Response => {
  if (Response.ok) {
    // convert response to json
    return Response.json()
  }
  throw new Error('Api did not respond')
}).then(Response => {
  // add to html
  let lastBlock = document.getElementById("lastblockno")
  lastBlock.textContent = Number(Response.result) 
})
