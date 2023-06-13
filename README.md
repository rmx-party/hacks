# RMXhacks-001

## usage

TODO

## dev setup

- get a web3 wallet installed, namely Metamask. create a scratch use personal wallet
  - hook up goerli and mumbai network configurations in wallet, via chainlist.org
- get nodejs installed, v 16.x
- get `pnpm` installed
- `pnpm i` in root directory and frontend directory
- set up ENV vars:
  - POLYGONSCAN_API_KEY (for contract code verification post deploy)
  - RMXHACKS_PRIVATE_KEY (for contract deployment)
  - RMXHACKS_WALLET_ADDRESS (also contract deployment)
  - HELLOWORLD_CONTRACT_ADDRESS (post deployment, for the UI to reference)
- `pnpm build` (hardhat compile, generates contract artifacts and others like typechain types etc)
- from hardhat root, `pnpm dev` should run a local rpc for testing. you can deploy contracts to this, perform test transactions and contract interactions, etc.
- from frontend root, `pnpm dev` runs the vite dev server for local testing with HMR
- from hardhat root, `npx hardhat run <script file>` to run a deploy script, which is JS written case by case


## deployment

TODO


