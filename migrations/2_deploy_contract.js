var SmartLottery = artifacts.require('./SmartLottery.sol')

module.exports = function (deployer) {
  deployer.deploy(SmartLottery)
}
