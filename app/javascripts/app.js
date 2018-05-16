import '../stylesheets/app.css'
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'
import smartLotteryArtifact from '../../build/contracts/SmartLottery.json'

const SmartLottery = contract(smartLotteryArtifact)

const App = {
  start: () => {
    SmartLottery.setProvider(web3.currentProvider)

    SmartLottery
            .deployed()
            .then(instance => Promise.all([instance.getParticipants(), instance.getPotValue()]))
            .then(([participants, potValue]) => {
              App.printParticipants(participants)
              App.printPotValue(potValue)
            })
            .then(() => App.listenOnUserInput())
  },

  printParticipants: participants => {
    const participantsHtml = participants.map((participant, i) => `<li>${i}. slot: ${participant}</li>`).join('')
    document.getElementById('participants').innerHTML = participantsHtml
  },

  printPotValue: potValue => {
    document.getElementById('potValue').innerHTML = potValue
  },

  listenOnUserInput: () => {
    document.getElementById('bet').onclick = () => {
      const slot = document.getElementById('slot').value
      const address = document.getElementById('address').value
      const password = document.getElementById('password').value
      App.placeABet(slot, address, password)
    }
  },

  placeABet: (slot, address, password) => {
    const oneMinute = 1000 * 60
    window.web3.personal.unlockAccount(address, password, oneMinute)

    SmartLottery
            .deployed()
            .then(instance => {
              instance.bet(slot, { from: address, value: 1000000000000000000, gas: 4712388 })
              return instance
            })
            .then(instance => instance.getParticipants())
            .then(participants => App.printParticipants(participants))
  }
}

window.addEventListener('load', () => {
  window.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9545'))

  App.start()
})

window.App = App
