require("dotenv").config();
const { ethers } = require("ethers");

// Setup connection
const url = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
console.log("Alchemy URL:", url); // should print your API key

const provider = new ethers.JsonRpcProvider(url);

const ADDRESS = "0xdadB0d80178819F2319190D340ce9A924f783711";

async function main() {
  const balance = await provider.getBalance(ADDRESS);
  console.log(`Balance: ${ethers.formatEther(balance)} ETH`);
}

main();