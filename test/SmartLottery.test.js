const SmartLottery = artifacts.require('./SmartLottery')

contract('SmartLottery', accounts => {
  it('should do smt', () => {
    SmartLottery
        .deployed()
        .then(instance => instance.getParticipants())
        .then(participants => assert.equal(participants, []))
  })
})
