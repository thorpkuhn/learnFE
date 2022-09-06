import { Alchemy, Network, Wallet } from "alchemy-sdk";
import dotenv from "dotenv";

dotenv.config();
const { API_KEY, PRIVATE_KEY } = process.env;

const settings = {
  apiKey: API_KEY,
  network: Network.ETH_GOERLI,
};
const alchemy = new Alchemy(settings);

let wallet = new Wallet(PRIVATE_KEY);

const nonce = await alchemy.core.getTransactionCount(wallet.address, "latest");

let transaction = {
  to: "0x31B98D14007bDEe637298086988A0bBd31184523", // faucet address to return eth
  value: 10,
  gasLimit: "201000",
  maxFeePerGas: "20000000000",
  nonce: nonce,
  type: 2,
  chainId: 5,
};

let rawTransaction = await wallet.signTransaction(transaction);
let tx = await alchemy.core.sendTransaction(rawTransaction);
console.log("Sent transaction", tx);