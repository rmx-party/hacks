import Web3 from 'web3'
import abi from './abi/RMXhacks001.json'
import { magic } from './magic'

const web3 = new Web3(magic.rpcProvider)
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS
if (!(contractAddress?.length > 0)) { throw new Error(`ENV var VITE_CONTRACT_ADDRESS not set`) }
const contract = new web3.eth.Contract(abi, contractAddress)

export function setupMintBtn(element: HTMLButtonElement) {
  console.log(`mint setup`, magic, contract)
  let button = element

  const startMint = async () => {
    const receipt = await contract.methods.mintNFT().send({ from: magic.rpcProvider.selectedAddress })
    console.log(`mint`, receipt, magic, contract)
  }

  const renderMint = () => {
    console.log(`renderMint`)
    button.innerHTML = `Mint`
    button.addEventListener('click', () => startMint())
    button.removeAttribute('disabled')
  }

  if (magic.user.isLoggedIn()) {
    renderMint()
    button.removeAttribute('disabled')
  }
}
