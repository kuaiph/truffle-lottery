const SmartLottery = artifacts.require('./SmartLottery')

contract('Smart Lottery', accounts => {
  describe('getting participants', () => {
    it('should list all participants', () => {
      SmartLottery
          .deployed()
          .then(instance => instance.getParticipants())
          .then(participants => participants.forEach(participant => assert(participant, '0x0000000000000000000000000000000000000000')))
    })
  })

  describe('betting', () => {
    it('should throw an exception on slot ids higher than 5', done => {
      SmartLottery
        .deployed()
        .then(instance => instance.bet(6))
        .catch(e => {
          assert(e.message.indexOf('revert') > -1)
          done()
        })
    })

    it('should throw an exception if betting on sold slots')

    it('should throw an exception if message value is not 1 ether')

    it('should pick a random winner if all slots are sold')

    it('should reset the contract if a winner was picked')

    it('should return the slotId')
  })

  describe('getting the pot value', () => {
    it('should return the pot value')
  })
})
