require("@nomicfoundation/hardhat-toolbox");
require('@nomiclabs/hardhat-ethers');
require('@openzeppelin/hardhat-upgrades');
require("hardhat-gas-reporter");
require('hardhat-contract-sizer');
require("hardhat-interact");
require("hardhat-gas-trackooor");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.20',
    settings: {
      viaIR: true,
      optimizer: { // https://docs.soliditylang.org/en/latest/internals/optimizer.html#optimizer-parameter-runs
        enabled: true,
        // enabled: false,
        runs: 20,
        // runs: 200,
        // runs: 100000,
      }
    },
  },
};
