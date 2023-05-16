
import { Web3Auth } from "@web3auth/modal";
import { CHAIN_NAMESPACES, CONNECTED_EVENT_DATA, SafeEventEmitterProvider, WALLET_ADAPTERS } from "@web3auth/base";
import { useEffect, useState } from "react";

import { ADAPTER_EVENTS } from "@web3auth/base";

// subscribe to lifecycle events emitted by web3auth
const subscribeAuthEvents = (web3auth: Web3Auth) => {
  web3auth.on(ADAPTER_EVENTS.CONNECTED, (data: CONNECTED_EVENT_DATA) => {
    console.log("connected to wallet", data);
    // web3auth.provider will be available here after user is connected
  });
  web3auth.on(ADAPTER_EVENTS.CONNECTING, () => {
    console.log("connecting");
  });
  web3auth.on(ADAPTER_EVENTS.DISCONNECTED, () => {
    console.log("disconnected");
  });
  web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
    console.log("error", error);
  });
  web3auth.on(ADAPTER_EVENTS.ERRORED, (error) => {
    console.log("error", error);
  });
};

import { Sdk, SessionStorage, randomPrivateKey } from 'etherspot';



const web3AuthNetwork = "testnet";
const chainId = "0x5"; // see https://chainlist.org/?testnets=true -- 0x5 is goerli, 0x1 is ethereum

function EtherSpotDemo() {


  const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
  // const [torusPlugin, setTorusPlugin] = useState<TorusWalletConnectorPlugin | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);

  const [idToken, setIdToken] = useState(null);

  const [sdk, setSdk] = useState<Sdk | null>(null);

  useEffect(() => {
    const newSdk = new Sdk(randomPrivateKey(), {
      sessionStorage: new SessionStorage(),
    });
    setSdk(newSdk);
  }, []);

  const etherSpotMain = async () => {
    if (!sdk) return;

    const output = await sdk.createSession();

    console.log('session object', output);
    console.log('session graphql headers', {
      ['x-auth-token']: output.token,
    });

    console.log(`account`, await sdk.syncAccount());

    const contractAccount = await sdk.computeContractAccount();
    console.log('contract account', contractAccount);
    sdk
      .notifications$
      .subscribe(
        eventData => console.log('Event:', eventData)
      );
  }

  useEffect(() => {
    etherSpotMain();
  }, [sdk, etherSpotMain])

  const uiConsole = (foo) => { console.log(foo) };

  const login = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const web3authProvider = await web3auth.connect();
    setProvider(web3authProvider);
    uiConsole("Logged in MAYBE Successfully!");
  };

  const authenticateUser = async () => {
    if (!web3auth) {
      uiConsole("web3auth not initialized yet");
      return;
    }
    const { idToken } = await web3auth.authenticateUser();
    uiConsole([`idToken`, idToken]);
    setIdToken(idToken);
  };

  useEffect(() => {
    const authInstance= new Web3Auth({
      clientId: "BFtC4cWQQ6nxVmWdQ1Hi-rqGPUQYP6FENOTXJda-D4Tx2r7g9M1JzEzxW_wwbVM2-73VAdcgCQQcnzzDcOyJxg8", // Get your Client ID from Web3Auth Dashboard
      web3AuthNetwork,
      chainConfig: {
        chainNamespace: CHAIN_NAMESPACES.EIP155,
        chainId,
      },
    });
    setWeb3auth(authInstance);
    console.log('web3auth', authInstance);
  }, [])

  useEffect(() => {
    console.log(`auth and status effect`, web3auth, web3auth?.status);

    if (web3auth) {
      subscribeAuthEvents(web3auth);

      const init = web3auth.initModal()
      init.then((res) => { console.log('init result', res); });
      console.log('init', init);
    }
    if(web3auth?.status == 'ready') {


      // web3auth.initModal({
      //   modalConfig: {
      //     [WALLET_ADAPTERS.OPENLOGIN]: {
      //       label: "openlogin",
      //       loginMethods: {
      //         google: {
      //           name: "google login",
      //         },
      //         facebook: {
      //           // it will hide the facebook option from the Web3Auth modal.
      //           name: "facebook login",
      //         },
      //       },
      //       // setting it to false will hide all social login methods from modal.
      //       showOnModal: true,
      //     },
      //   },
      // }); 

      web3auth.connect()
        .then((connection) => console.log(connection));
    // web3auth.getUserInfo()
    //   .then((connection) => console.log(connection));

    }
  }, [web3auth, web3auth?.status])



  return (
    <>
      <p>Hello, Etherspot</p>
      {idToken && <>
        <code>{`${idToken}`}</code>
      </>}
      <button onClick={login}>Login</button>
      <button onClick={authenticateUser}>Authenticate</button>
    </>
  )
}

export default EtherSpotDemo;
