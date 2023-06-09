import { Magic } from 'magic-sdk';
import Web3 from 'web3';

import { magic } from './magic';

const magicProvider = await magic.wallet.getProvider();
const web3 = new Web3(magicProvider);

// let accounts = null;

// export const loginHandler = async () => {
//   accounts = await magic.wallet.connectWithUI()
// }

// ⭐️ After user is successfully authenticated
// const destination = '0x777ED066eB783d02C7421eB6221e9eB3fBB15501';
// const amount = 10000000000000000; // 0.1 eth in wei

// Submit transaction to the blockchain
// const tx = web3.eth.sendTransaction({
//   from: accounts[0],
//   to: destination,
//   value: amount,
// });

// Wait for transaction to be mined
// const receipt = await tx;

// console.log(
//   'first transaction demo results',
//   receipt,
//   tx,
//   accounts,
//   web3,
//   magicProvider,
//   magic
// )
