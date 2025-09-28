require("dotenv").config({
  path: require("path").join(__dirname, "..", ".env"),
});

const { log } = require("console");
const { ethers } = require("ethers");

const url = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`;
//provider is required to read data by interacting with ethereum blockchain
const provider = new ethers.JsonRpcProvider(url);
const ERC20_ADDRESS = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
const ERC20_ABI = ["function name() view returns (string)"];

//abi - application binary interface is basically a part of smartcontract which is used to interact with the function present in the smart contract;

const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, provider);
//provider to read data from the contract and signer to write data through contract.

async function main(params) {
  const name = await contract.name();
  console.log("contract address:", ERC20_ADDRESS);
  console.log(`\nToken Name: ${name}`);
}

main();
