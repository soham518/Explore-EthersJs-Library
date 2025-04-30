require("dotenv").config()
const { ethers } = require("ethers")

// Import private key helper
const { promptForKey } = require("../helpers/prompt.js")

// Setup connection
const URL = process.env.TENDERLY_RPC_URL
const provider = new ethers.JsonRpcProvider(URL)

const ACCOUNT_1 = "0x830690922a56f31cb96851951587d8a2f45c0eba" // Your account address 1
const ACCOUNT_2 = "0xbd67bf269c42b8d8777351e4982dec68cee90a12" // Your account address 2

// Define "Application Binary Interface"
const ERC20_ABI = [
  "function decimals() view returns (uint)",
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount) returns (bool)",
];

const ERC20_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48" // USDC Contract
const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, provider)

async function main() {
  const privateKey = await promptForKey()
  const wallet = new ethers.Wallet(privateKey, provider)

  const balance = await contract.balanceOf(ACCOUNT_1)

  console.log(`\nReading from ${ERC20_ADDRESS}\n`)
  console.log(`Balance of sender: ${balance}\n`)

  const decimals = await contract.decimals()
  const AMOUNT = ethers.parseUnits("1", decimals)

  const transaction = await contract.connect(wallet).transfer(ACCOUNT_2, AMOUNT)
  await transaction.wait()

  console.log(transaction)

  const balanceOfSender = await contract.balanceOf(ACCOUNT_1)
  const balanceOfReciever = await contract.balanceOf(ACCOUNT_2)

  console.log(`\nBalance of sender: ${balanceOfSender}`)
  console.log(`Balance of reciever: ${balanceOfReciever}\n`)
}

main()