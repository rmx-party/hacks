import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-toolbox"
import '@nomiclabs/hardhat-ethers'
import '@openzeppelin/hardhat-upgrades'
import "hardhat-gas-reporter"
import 'hardhat-contract-sizer'
import "hardhat-interact"
import "hardhat-gas-trackooor"

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.20',
    settings: {
      viaIR: true,
      optimizer: { // https://docs.soliditylang.org/en/latest/internals/optimizer.html#optimizer-parameter-runs
        enabled: true,
        runs: 20,
      }
    },
  },
};

export default config;
