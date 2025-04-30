require("dotenv").config()
const { ethers } = require("ethers")

// Setup connection
const URL = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
const provider = new ethers.JsonRpcProvider(URL)

const ADDRESS = "0x73BCEb1Cd57C711feaC4224D062b0F6ff338501e"

async function main() {
  const balance = await provider.getBalance(ADDRESS)
  console.log(`\nETH Balance of ${ADDRESS} --> ${ethers.formatUnits(balance, 18)} ETH\n`)
}

main()