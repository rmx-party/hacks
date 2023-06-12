import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-toolbox"
import '@nomiclabs/hardhat-ethers'
import '@openzeppelin/hardhat-upgrades'
import "hardhat-gas-reporter"
import 'hardhat-contract-sizer'
import "hardhat-interact"
import "hardhat-gas-trackooor"
import 'hardhat-abi-exporter'
import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'

const POLYGONSCAN_API_KEY = process.env.POLYGONSCAN_API_KEY || ''; 
require("@nomiclabs/hardhat-etherscan");

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {},
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [`0x${process.env.RMXHACKS_PRIVATE_KEY}`],
    }
  },
  solidity: {
    version: '0.8.19',
    settings: {
      viaIR: true,
      optimizer: { // https://docs.soliditylang.org/en/latest/internals/optimizer.html#optimizer-parameter-runs
        enabled: true,
        runs: 20,
      }
    },
  },
  abiExporter: {
    path: './frontend/src/abi',
    clear: true,
    runOnCompile: true,
    flat: true,
    spacing: 2,
    format: 'json'
  },
  etherscan: {
    apiKey: {
      polygonMumbai: POLYGONSCAN_API_KEY,
    }
  }
};

export default config;
