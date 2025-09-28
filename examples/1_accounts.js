const { ethers } = require("ethers");
require("dotenv").config();
// Setup connection
const url = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHIMY_API_KEY}`;
const provider = new ethers.JsonRpcProvider(url);

const ADDRESS = "0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97";
async function main() {
  // Get balance
  //provider is to read any data from the blockchain.
  //signer is for writing any data on the blockchain
  const balance = await provider.getBalance(ADDRESS);
  // format ether is used to convert the balance from wei to eth.
  console.log(`Balance: ${ethers.formatEther(balance)} ETH`);
}

main();
