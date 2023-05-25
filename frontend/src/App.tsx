import './App.css'
import EtherSpotDemo from './EtherSpotDemo'
import TransactionKitDemo from './TransactionKitDemo'

function App() {
  return (
    <>
      <h1>Vite + React + Etherspot + Web3Auth</h1>
      <div className="card">
        <EtherSpotDemo />
        <TransactionKitDemo />
      </div>
    </>
  )
}

export default App
