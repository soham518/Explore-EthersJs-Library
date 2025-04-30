require("dotenv").config()
const { ethers } = require("ethers")

// Import private key helper
const { promptForKey } = require("../helpers/prompt.js")

// Setup connection
const URL = process.env.TENDERLY_RPC_URL
const provider = new ethers.JsonRpcProvider(URL)

const RECIEVER = "0xbd67bf269c42b8d8777351e4982dec68cee90a12" // Your account address 2

async function main() {
  const privateKey = await promptForKey()
  const wallet = new ethers.Wallet(privateKey, provider)

  const senderBalanceBefore = await provider.getBalance(wallet.address)
  const recieverBalanceBefore = await provider.getBalance(RECIEVER)

  console.log(`\nSender balance before: ${ethers.formatUnits(senderBalanceBefore, 18)}`)
  console.log(`Reciever balance before: ${ethers.formatUnits(recieverBalanceBefore, 18)}\n`)

  const transaction = await wallet.sendTransaction({
    to: RECIEVER,
    value: ethers.parseUnits("1", 18)
  })

  const receipt = await transaction.wait()
  console.log(transaction)
  console.log(receipt)

  const senderBalanceAfter = await provider.getBalance(wallet.address)
  const recieverBalanceAfter = await provider.getBalance(RECIEVER)

  console.log(`\nSender balance after: ${ethers.formatUnits(senderBalanceAfter, 18)}`)
  console.log(`Reciever balance after: ${ethers.formatUnits(recieverBalanceAfter, 18)}\n`)
}

main()