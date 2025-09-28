require("dotenv").config({
  path: require("path").join(__dirname, "..", ".env"),
});
const { ethers } = require("ethers");

// Import private key helper
const { promptForKey } = require("../helpers/prompt.js");
const url = `https://virtual.mainnet.eu.rpc.tenderly.co/${process.env.TENDERLY_RPC_URL}`;

const provider = new ethers.JsonRpcProvider(url);
// Setup connection
const RECEIVER_ADDRESS = "0x5098328000388440c397E6d8649339096f90d63f";
async function main() {
  const private_key = await promptForKey();
  console.log(private_key);
  //setting up the wallet
  const wallet = new ethers.Wallet(private_key, provider);
  //getting wallet balance from sender and receiver
  const sendersBalanceBefore = await provider.getBalance(wallet.address);
  const receiversBalanceBefore = await provider.getBalance(RECEIVER_ADDRESS);
  //loging the balance
  console.log(
    `Senders Balance Befor Transaction: ${ethers.formatEther(
      sendersBalanceBefore
    )} ETH\n`
  );
  console.log(
    `Receivers Balance Befor Transaction: ${ethers.formatEther(
      receiversBalanceBefore
    )} ETH\n`
  );

  const transaction = await wallet.sendTransaction({
    to: RECEIVER_ADDRESS,
    value: ethers.parseUnits("1", 18),
  });

  const recept = await transaction.wait();

  const sendersBalanceAfter = await provider.getBalance(wallet.address);
  const receiversBalanceAfter = await provider.getBalance(RECEIVER_ADDRESS);

  console.log(transaction);
  console.log(recept);
  console.log(
    `Senders Balance After Transaction: ${ethers.formatEther(
      sendersBalanceAfter
    )} ETH\n`
  );
  console.log(
    `Receivers Balance After Transaction: ${ethers.formatEther(
      receiversBalanceAfter
    )} ETH\n`
  );
}

main();

