require("dotenv").config({
  path: require("path").join(__dirname, "..", ".env"),
});
const { ethers } = require("ethers");

// Import private key helper
const { promptForKey } = require("../helpers/prompt.js");

// Setup connection
const URL = `https://virtual.mainnet.eu.rpc.tenderly.co/${process.env.TENDERLY_RPC_URL}`;
const provider = new ethers.JsonRpcProvider(URL);

// Define "Application Binary Interface"
const ERC20_ABI = [
  "function decimals() view returns (uint)",
  "function balanceOf(address) view returns (uint)",
  "function transfer(address to, uint amount) returns (bool)",
];

// Setup contract
const ERC20_ADDRESS = "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984";
const contract = new ethers.Contract(ERC20_ADDRESS, ERC20_ABI, provider);

const RECIEVER = "0x5098328000388440c397E6d8649339096f90d63f"; // Your account address 2

async function main() {
  const privateKey = await promptForKey();

  // Setup wallet
  const wallet = new ethers.Wallet(privateKey, provider);

  // Get ERC20 balances
  const senderBalanceBefore = await contract.balanceOf(wallet.address);
  const recieverBalanceBefore = await contract.balanceOf(RECIEVER);
  const sendersFormattedBalanceBefore = ethers.formatUnits(
    senderBalanceBefore,
    18
  );
  const receiversFormattedBalanceBefore = ethers.formatUnits(
    recieverBalanceBefore,
    18
  );

  // Log ERC20 balances
  console.log(`\nReading from ${ERC20_ADDRESS}\n`);
  console.log(`Sender balance before: ${sendersFormattedBalanceBefore}`);
  console.log(`Reciever balance before: ${receiversFormattedBalanceBefore}\n`);

  // Setup amount to transfer
  const decimals = await contract.decimals();
  const AMOUNT = ethers.parseUnits("1", 18);

  // Create transaction
  const transaction = await contract.connect(wallet).transfer(RECIEVER, AMOUNT)

  // Wait transaction
  await transaction.wait()

  // Log transaction
  console.log(transaction)

  // Get ERC20 balances
  const senderBalanceAfter = await contract.balanceOf(wallet.address)
  const recieverBalanceAfter = await contract.balanceOf(RECIEVER)

  // Log ERC20 balances
  console.log(`\nBalance of sender: ${senderBalanceAfter}`)
  console.log(`Balance of reciever: ${recieverBalanceAfter}\n`)
}

main();
