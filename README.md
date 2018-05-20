# Smart Lottery

This is a **D**istributed lottery [truffle](https://github.com/trufflesuite/truffle) **App**lication. It demonstrate how easy it is to implement, test and deploy a smart lottery with truffle.

## Prerequisites

- Google Chrome or Firefox with MetaMask plugin
- Optionally: Infura API key
- Node.js

## [How to] Test, deploy and run

Before you can do anything, install the application:
```
cd /to/this/repo
npm install
```

### Test

Type `truffle test` to run all truffle and solidity tests in [./test](./test)

### Deploy

Contract deployment is called `migration` at truffle. Type `truffle migrate --network <network_name>` to deploy the contracts as defined by the [deployment scripts](./migrations). Make sure to have a valid network setup as defined in [./truffle.js](./truffle.js).

Use the pre-network `rinkeby` if you want to deploy to Etherium's testnetwork rinkeby using Infura instead of a local Etherium client setup. Make sure to provide an [Infura API key](https://infura.io/) and your account's address and key as environment variables, e.g. `RINKEBY_ADDRESS=0x23094... RINKEBY_PRIVKEY=abc... INFURA_RINKEBY=12039... truffle migrate --network <network_name>`

### Run

Run the development setup of this application by simply typing `npm run dev` and open [http://localhost:8080](http://localhost:8080) in your local browser.

## Components

### Javascript code

The [JS application](./app/javascript) runs locally in your browser. It is responsible for listening on user input and interacting with the given Etherium network. The application gets transpiled by Webpack [using the webpack.config](./webpack.config.js).

### HTML and CSS

[HTML and CSS] is used to provide a GUI to interact with the deployed lottery smart contract.

### Contracts

Find the Migrations.sol and SmartLottery.sol contracts at [./contracts]('./contracts'). Truffle uses Migrations.sol keep track this application's contract deployments.

### Tests

The SmartLottery contract [is tested](./test) with the testframework provided by truffle. See the [Solidity documentation](http://truffleframework.com/docs/getting_started/solidity-tests) for pure solidity tests.
