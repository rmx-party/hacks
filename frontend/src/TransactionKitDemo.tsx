import {
  EtherspotBatches,
  EtherspotBatch,
  EtherspotTransaction,
  useEtherspotTransactions,
  useEtherspotBalances,
  useEtherspotUi,
  useEtherspotAddresses,
  useEtherspotHistory,
  EtherspotContractTransaction,
} from '@etherspot/transaction-kit';
import { useEffect, useState } from 'react';
import { map, flow, compact } from 'lodash/fp';
import { ethers } from 'ethers';

function TransactionKitDemo() {

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

  const [address, setAddress] = useState('0x271Ae6E03257264F0F7cb03506b12A027Ec53B31');
  const [amount, setAmount] = useState('0.001');

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

  const myContractAddress = `${process.env.VITE_MY_CONTRACT_ADDRESS}`;

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
        <h3>Your Smart Wallet Balance on Etherspot Mumbai</h3>
        <pre style={{ textAlign: 'left', fontSize: '8px' }}>
          {JSON.stringify(etherspotBalanceOnMumbai, null, 2)}
        </pre>
      </section>

      <section>
        <h3>Create Transaction Batch</h3>
        <EtherspotBatches>
          <EtherspotBatch>
            <EtherspotContractTransaction contractAddress={myContractAddress} methodName={'mintNFT'} abi={''} />
            <EtherspotTransaction
              to={address}
              value={amount}
            >
              <input
                type="text"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
              <input
                type="text"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              />
              <hr />
              <button onClick={() => estimate()}>Estimate</button>
              <button onClick={() => send()}>Send</button>
            </EtherspotTransaction>
            <EtherspotTransaction
              to={address}
              value={amount}
            >
              <input
                type="text"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
              <input
                type="text"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              />
              <hr />
              <button onClick={() => estimate()}>Estimate</button>
              <button onClick={() => send()}>Send</button>
            </EtherspotTransaction>
          </EtherspotBatch>
        </EtherspotBatches>
      </section>
    </div>
  )
}
export default TransactionKitDemo