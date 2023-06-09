import {
  EtherspotBatches,
  EtherspotBatch,
  useEtherspotTransactions,
  useEtherspotBalances,
  useEtherspotAddresses,
  useEtherspotHistory,
  useEtherspotUtils,
  EtherspotContractTransaction,
} from '@etherspot/transaction-kit';
import { useEffect, useState } from 'react';
import { map, } from 'lodash/fp';
import { ethers } from 'ethers';
import contractAbi from './abi/RMXhacks001.json';

function TransactionKitDemo({ authProvider } ) {
  const contractAddress = `${process.env.VITE_MY_CONTRACT_ADDRESS}`;
  // const provider = new ethers.providers.JsonRpcProvider('http://localhost:8545');
  // const contract = new ethers.Contract(contractAddress, contractAbi, authProvider);



  // const utils = useEtherspotUtils();
  const { estimate, send } = useEtherspotTransactions();
  const etherspotAddresses = useEtherspotAddresses();

  // const [balances, setBalances] = useState<any[]>([]);
  // useEffect(() => {
  //   const balances = flow(
  //     map((etherSpotAddress) => etherSpotAddress?.chainId),
  //     compact,
  //     useEtherspotBalances,
  //     )(etherspotAddresses);
  //   setBalances(balances)
  // }, [etherspotAddresses]);

  const etherspotBalanceOnMumbai = useEtherspotBalances(80001);

  const [transactionHistory, setTransactionHistory] = useState<any[]>([]);
  const { getAccountTransactions } = useEtherspotHistory();
  useEffect(() => {
    (async () => {
      const accountTransactionHistory = await getAccountTransactions(); // This is also a Promise
      console.log(`accountTransactionHistory:`, accountTransactionHistory);
      setTransactionHistory(accountTransactionHistory);
    })()
    return () => { }
  }, [getAccountTransactions])


  // accountTransactionHistory will now contain an array of history objects.

  return (
    <div style={{ display: 'flex', maxWidth: '80vw', flexWrap: 'wrap' }}>
      <section>
        <h3>Transaction History</h3>
        {map((transaction) => (
          <pre style={{ textAlign: 'left', fontSize: '8px' }}>
            {JSON.stringify(transaction, null, 2)}
          </pre>
        ), transactionHistory)}
      </section>

      <section>
        <h3>Your Smart Wallet Addresses (on Etherspot)</h3>
        {/* The following returns a list of Blockchain
          addresses that are ready to use */}
        {map((etherspotAddressObject) => (
          <pre style={{ textAlign: 'left', fontSize: '8px' }}>
            <p>Blockchain Name: {etherspotAddressObject?.chainName}</p>
            <p>Blockchain ID:{etherspotAddressObject?.chainId}</p>
            <p>Address: {etherspotAddressObject?.address}</p>
          </pre>
        ), etherspotAddresses)}
      </section>

      <section>
        <h3>Your Smart Wallet Balance on Etherspot Mumbai
          <small>(you may need to transfer some funds to this address to use it)</small>
        </h3>
        <pre style={{ textAlign: 'left', fontSize: '8px' }}>
          {JSON.stringify(etherspotBalanceOnMumbai, null, 2)}
        </pre>
      </section>

      <section>
        <h3>Create Transaction Batch</h3>
        <EtherspotBatches>
          <EtherspotBatch>
            <EtherspotContractTransaction contractAddress={contractAddress} methodName={'mintNFT'} abi={contractAbi} >Mint One</EtherspotContractTransaction>
            <br/>
            <EtherspotContractTransaction contractAddress={contractAddress} methodName={'mintNFT'} abi={contractAbi} >Mint Two</EtherspotContractTransaction>
            <hr />
            <button onClick={() => estimate()}>Estimate</button>
            <button onClick={() => send()}>Send</button>
          </EtherspotBatch>
        </EtherspotBatches>
      </section>
    </div>
  )
}
export default TransactionKitDemo
