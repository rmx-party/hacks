import './App.css';
import EtherSpotDemo from './EtherSpotDemo';
import TransactionKitDemo from './TransactionKitDemo';
import { useState } from 'react';
import { useAccount, useDisconnect } from '@web3-react/hooks';
import { Web3AuthNoModal } from '@web3auth/web3auth-react';
import { Etherspot } from '@web3auth/etherspot-react';

function App() {

  const [authProvider, setAuthProvider] = useState(null);

  const authCallback = (authProvider) => {
    console.log(`authProvider:`, authProvider);
    setAuthProvider(authProvider)
  }

  const [connectedProvider, setConnectedProvider] = useState(null);
  const [web3AuthInstance, setWeb3AuthInstance] = useState<Web3AuthNoModal | null>(null);
  const { disconnect: wagmiDisconnect } = useDisconnect();
  const { connector, isConnected } = useAccount();


  return (
    <>
    <h2>Vite + React + Etherspot + Web3Auth</h2>
    <Etherspot
              provider={connectedProvider}
              chainId={chainId}
              themeOverride={themeOverride}
              onLogout={async () => {
                try {
                  if (isConnected) wagmiDisconnect();
                  if (connector) await connector.disconnect();
                } catch (e) {
                  //
                }

                try {
                  if (web3AuthInstance) {
                    await web3AuthInstance.logout({ cleanup: true });
                    web3AuthInstance.clearCache();
                  }
                } catch (e) {
                  //
                }

                setConnectedProvider(null);
              }}
              showMenuLogout
            />
      <div className="card">
        <EtherSpotDemo authCallback={authCallback} />
        <TransactionKitDemo authProvider={authProvider} />
      </div>
    </>
  )
}

export default App
