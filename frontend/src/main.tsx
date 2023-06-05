import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.js'
import './index.css'
import { EtherspotTransactionKit } from '@etherspot/transaction-kit';
import { ethers } from 'ethers';

const randomWallet = ethers.Wallet.createRandom();
const providerWallet = new ethers.Wallet(randomWallet.privateKey);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <EtherspotTransactionKit
      provider={providerWallet} /* The random wallet we created above */
      chainId={80001} /* Polygon Testnet - Mumbai */
    >
      <App />
    </EtherspotTransactionKit>
  </React.StrictMode>,
)
