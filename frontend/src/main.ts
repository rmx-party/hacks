import './style.css'

import { fetchBalance, fetchAddress } from './helloWorld.ts'
import { setupLoginBtn } from './loginBtn.ts'
import { setupMintBtn } from './mintBtn.ts'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <header>
      <h1>
        RMXhacks-001
      </h1>
        <p>easy wallet login and batch minting</p>
        <p>after login, you will have a wallet that you can use without a browser extension to mint NFTs in a batch instead of one by one. you'll need to send some MATIC to this address on the Mumbai testnet to cover the gas costs.</p>
    </header>

    <noscript>
      <div class="alert alert-error">
        <p>Sorry, this application requires JavaScript.</p>
      </div>
    </noscript>

    <button id="login" type="button" disabled="disabled">Log In</button>
    <button id="mint" type="button" disabled="disabled">Mint</button>
    <div class="card">
      <label for="address">Address</label>
      <div class="info">
        <code id="address">TBD
        </code>
      </div>
    </div>
    <div class="card">
      <label for="balance">Balance</label>
      <div class="info">
        <span id="balance">0.00</span> MATIC
      </div>
  </div>
`

const afterLogout = async (state) => {
  console.log(`afterLogout`, state)
  document.querySelector<HTMLSpanElement>('#address')!.textContent = 'Not logged in'
  document.querySelector<HTMLSpanElement>('#balance')!.textContent = '0.00'
  //disable mint button
  document.querySelector<HTMLButtonElement>('#mint')!.setAttribute('disabled', 'disabled')
}
const afterLogin = async (state) => {
  console.log(`afterLogin`, state)
  const address = await fetchAddress()
  fetchBalance(address)
  // setupMintBtn(document.querySelector<HTMLButtonElement>('#mint')!)
}
setupLoginBtn(document.querySelector<HTMLButtonElement>('#login')!, afterLogin, afterLogout)
