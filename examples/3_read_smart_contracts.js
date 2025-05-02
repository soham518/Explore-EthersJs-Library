require("dotenv").config()
const { ethers } = require("ethers")

// Setup connection
const URL = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`
const provider = new ethers.JsonRpcProvider(URL)

// Define "Application Binary Interface"
const ERC20_ABI = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint256)",
  "function totalSupply() view returns (uint256)",
  "function balanceOf(address) view returns (uint)",
];

// Setup contract
const ERC20_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" // USDC Contract
const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, provider)

async function main() {
  // Get contract state
  const name = await contract.name()
  const symbol = await contract.symbol()
  const decimals = await contract.decimals()
  const totalSupply = await contract.totalSupply()

  // Log contract state
  console.log(`\nReading from ${ERC20_ADDRESS}\n`)
  console.log(`Name: ${name}`)
  console.log(`Symbol: ${symbol}`)
  console.log(`Decimals: ${decimals}`)
  console.log(`Total Supply: ${totalSupply}\n`)

  // Get ERC20 balance
  const USER_ADDRESS = "0x98C23E9d8f34FEFb1B7BD6a91B7FF122F4e16F5c"
  const balance = await contract.balanceOf(USER_ADDRESS)

  // Log ERC20 balance
  console.log(`Balance Returned: ${balance}`)
  console.log(`Balance Formatted: ${ethers.formatUnits(balance, decimals)}\n`)
}

main()