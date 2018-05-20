// Allows us to use ES6 in our migrations and tests.
require('babel-register')
const WalletProvider = require('truffle-hdwallet-provider-privkey')
const config = require('config')

module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 9545,
      network_id: '*' // Match any network id
    },
    rinkeby: {
      provider: () => new WalletProvider(config.get('rinkeby.privKey'), `https://rinkeby.infura.io/${config.get('infura.rinkeby')}`),
      network_id: 4,
      from: config.get('rinkeby.address')
    }
  }
}
