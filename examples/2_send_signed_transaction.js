require("dotenv").config({ path: require('path').join(__dirname, '..', '.env') });
const { ethers } = require("ethers");

// Import private key helper
const { promptForKey } = require("../helpers/prompt.js");
const url = `https://virtual.mainnet.eu.rpc.tenderly.co/${process.env.TENDERLY_RPC_URL}`;

const provider = new ethers.JsonRpcProvider(url);
// Setup connection

async function main() {
  const private_key = await promptForKey();
  console.log(private_key);
  //setting up the wallet
  const wallet = new ethers.Wallet(private_key, provider);
  //getting wallet balance
  const balance = await provider.getBalance(wallet.address);
  //loging the balance
  console.log(`Balance: ${ethers.formatEther(balance)} ETH`);


}

main();
//6755f93f41a954c2052ad032aa3d13cf1c7aeaa2e17cbdc7f34990d6ec3dde47