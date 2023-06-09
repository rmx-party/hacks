import { Magic } from 'magic-sdk';
import Web3 from 'web3';

import { magic } from './magic';

const magicProvider = await magic.wallet.getProvider();
const web3 = new Web3(magicProvider);

export const fetchBalance = async (address) => {
  const bal = await web3.eth.getBalance(address)
  const rawBalance = web3.utils.fromWei(bal)
  const balance = rawBalance.toString().substring(0, 6)

  document.querySelector<HTMLSpanElement>('#balance')!.textContent = balance
}

export const fetchAddress = async () => {
  const accounts = await web3.eth.getAccounts()
  const address = accounts[0]

  if (!address) {
    document.querySelector<HTMLSpanElement>('#address')!.textContent = 'Not logged in'
    return
  }

  document.querySelector<HTMLSpanElement>('#address')!.textContent = address
  return address
}

