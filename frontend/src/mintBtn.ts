import Web3 from 'web3'
import abi from './abi/RMXhacks001.json'
import { magic } from './magic'

const web3 = new Web3(magic.rpcProvider)
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS
console.log(`contract:`, contractAddress)
if (!(contractAddress?.length > 0)) { throw new Error(`ENV var VITE_CONTRACT_ADDRESS not set`) }
const contract = new web3.eth.Contract(abi, contractAddress)

export async function setupMintBtn(element: HTMLButtonElement) {
  console.log(`mint setup`, magic, contract)
  let button = element

  const startMint = async () => {
    console.log(`web3`, web3)
    const accounts = await web3.eth.getAccounts()
    const receipt = await contract.methods.mintNFT().send({ from: accounts[0] })
    console.log(`mint`, receipt, magic, contract)

    if (receipt.status) { // TODO: this probably belongs somewhere else
      renderNfts(receipt)
    }
  }

  const renderNfts = async (receipt) => {
    const tokenId = receipt?.events?.Transfer?.returnValues?.tokenId
    if (!tokenId) return;

    // TODO: switch to mainnet based on network
    const openSeaLink = `https://testnets.opensea.io/assets/${contractAddress}/${tokenId}`

    console.log(`openSeaLink`, openSeaLink)
    const nft = document.createElement('div')
    nft.innerHTML = `<a href="${openSeaLink}" target="_blank">View ${tokenId} on OpenSea</a>`
  }

  const renderMint = () => {
    console.log(`renderMint`)
    button.innerHTML = `Mint`
    button.addEventListener('click', () => startMint())
    button.removeAttribute('disabled')
  }

  if (await magic.user.isLoggedIn()) {
    renderMint()
    button.removeAttribute('disabled')
  }
}
