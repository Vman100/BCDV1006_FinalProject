//fetch Data
const fetchData = (action) => {
  const apiKey = "5XKQA6GX56G7IZUUTEZ88X916BQNI8J2EX"
  const url=`https://api.etherscan.io/api?${action}&${apiKey}`
  return fetch(url)
}

// convert response to json
function json(Response) {
  if (Response.ok) {
    return Response.json()
  }
  throw new Error('Api did not respond')
}

// get block information by number
const getBlockByNumber = (number) => {
  return `module=proxy&action=eth_getBlockByNumber&tag=${number}&boolean=true`
}

fetchData(getBlockByNumber("latest")).then(json).then(Response => {
  // add to html
  let lastBlock = document.getElementById("lastblockno")
  lastBlock.textContent = Number(Response.result.number)
})
