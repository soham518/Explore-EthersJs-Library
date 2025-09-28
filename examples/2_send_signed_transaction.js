require("dotenv").config();
const { ethers } = require("ethers");

// Import private key helper
const { promptForKey } = require("../helpers/prompt.js");
const url = process.env.TENDERLY_RPC_URL;
// Setup connection

async function main() {
  const private_key = await promptForKey();
}

main();
