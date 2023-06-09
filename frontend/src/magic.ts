import { Magic } from 'magic-sdk';

const env = import.meta.env
const rpcUrl = env.VITE_RPC_URL
const chainId = env.VITE_CHAIN_ID
const apiKey = env.VITE_MAGIC_PUBLISHABLE_KEY

const customNodeOptions = {
  rpcUrl,
  chainId
}

const magic = new Magic(apiKey, {  network: customNodeOptions});
magic.preload()

export { magic }
